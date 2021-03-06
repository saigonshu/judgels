package org.iatoki.judgels.jerahmeel;

import com.google.common.collect.ImmutableList;
import org.apache.commons.lang3.StringUtils;
import org.iatoki.judgels.play.IdentityUtils;
import play.mvc.Http;

import java.util.Arrays;
import java.util.List;

public final class JerahmeelUtils {

    private JerahmeelUtils() {
        // prevent instantiation
    }

    public static boolean isGuest() {
        return IdentityUtils.getUserJid().startsWith("guest");
    }

    public static List<String> getDefaultRoles() {
        return ImmutableList.of("user");
    }

    public static String getRolesFromSession() {
        return getFromSession("role");
    }

    public static void saveRolesInSession(List<String> roles) {
        putInSession("role", StringUtils.join(roles, ","));
    }

    public static boolean hasRole(String role) {
        return Http.Context.current().session().containsKey("role") && Arrays.asList(getFromSession("role").split(",")).contains(role);
    }

    public static String getRealUserJid() {
        return IdentityUtils.getUserJid();
    }

    public static String getRealUsername() {
        return IdentityUtils.getUsername();
    }

    private static void putInSession(String key, String value) {
        Http.Context.current().session().put(key, value);
    }

    private static String getFromSession(String key) {
        return Http.Context.current().session().get(key);
    }
}
