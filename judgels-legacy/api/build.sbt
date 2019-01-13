import Versions._

val checkstyle = taskKey[Unit]("Execute checkstyle")

checkstyle := {
    val v = ("../judgels/scripts/execute-checkstyle.sh" !)
    if (v != 0) {
        sys.error("Failed")
    }
}

val workaround = {
  sys.props += "packaging.type" -> "jar"
  ()
}

lazy val api = (project in file("."))
    .dependsOn(sealtielApi)
    .aggregate(sealtielApi)
    .settings(
        name := "api",
        version := IO.read(file("version.properties")).trim,
        scalaVersion := "2.11.7",
        libraryDependencies ++= Seq(
            "com.puppycrawl.tools" % "checkstyle" % "6.8.1",
            "com.google.code.gson" % "gson" % "2.3.1",
            "com.google.guava" % "guava" % guavaVersion,
            "commons-io" % "commons-io" % "2.4",
            "org.apache.httpcomponents" % "httpclient" % "4.5",
            "org.apache.commons" % "commons-lang3" % apacheCommonsLang3Version
        )
    )

lazy val sealtielApi = RootProject(file("../../judgels-backends/sealtiel/sealtiel-api"))
