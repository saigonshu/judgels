package judgels.jophiel.user.email;

import javax.persistence.Column;
import javax.persistence.Entity;
import judgels.persistence.JidPrefix;
import judgels.persistence.Model;

@SuppressWarnings("checkstyle:visibilitymodifier")
@Entity(name = "jophiel_user_verification_email")
@JidPrefix("USEE")
public class UserVerificationEmailModel extends Model {
    @Column(unique = true, nullable = false)
    public String userJid;

    @Column(unique = true, nullable = false)
    public String emailCode;

    public boolean verified;
}
