package judgels.gabriel.sandboxes.fake;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import judgels.gabriel.api.Sandbox;
import judgels.gabriel.api.SandboxException;
import judgels.gabriel.api.SandboxExecutionResult;
import judgels.gabriel.api.SandboxInteractor;

public class FakeSandboxInteractor implements SandboxInteractor {
    @Override
    public SandboxExecutionResult[] interact(
            Sandbox sandbox1,
            List<String> command1,
            Sandbox sandbox2,
            List<String> command2) {

        ProcessBuilder pb1 = sandbox1.getProcessBuilder(command1);
        ProcessBuilder pb2 = sandbox2.getProcessBuilder(command2);

        Process p1;
        Process p2;

        try {
            p1 = pb1.start();
            p2 = pb2.start();
        } catch (IOException e) {
            return new SandboxExecutionResult[]{
                    SandboxExecutionResult.internalError(e.getMessage()),
                    SandboxExecutionResult.internalError(e.getMessage())
            };
        }

        InputStream p1InputStream = p1.getInputStream();
        OutputStream p1OutputStream = p1.getOutputStream();

        InputStream p2InputStream = p2.getInputStream();
        OutputStream p2OutputStream = p2.getOutputStream();

        ExecutorService executor = Executors.newFixedThreadPool(2);

        executor.submit(new UnidirectionalPipe(p1InputStream, p2OutputStream));
        executor.submit(new UnidirectionalPipe(p2InputStream, p1OutputStream));

        int exitCode1;
        int exitCode2;
        try {
            exitCode2 = p2.waitFor();
            exitCode1 = p1.waitFor();
        } catch (InterruptedException e) {
            return new SandboxExecutionResult[]{
                    SandboxExecutionResult.internalError(e.getMessage()),
                    SandboxExecutionResult.internalError(e.getMessage())
            };
        }

        return new SandboxExecutionResult[]{
                sandbox1.getResult(exitCode1),
                sandbox2.getResult(exitCode2)
        };
    }

    class UnidirectionalPipe implements Runnable {
        private final InputStream in;
        private final OutputStream out;

        UnidirectionalPipe(InputStream in, OutputStream out) {
            this.in = in;
            this.out = out;
        }

        @Override
        public void run() {
            try {
                while (true) {
                    byte[] buffer = new byte[4096];
                    int len = in.read(buffer);
                    if (len == -1) {
                        break;
                    }

                    out.write(buffer, 0, len);
                    out.flush();
                }

                in.close();
                out.close();

            } catch (IOException e) {
                throw new SandboxException(e);
            }
        }
    }
}
