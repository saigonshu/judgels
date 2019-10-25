package judgels.jerahmeel;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import judgels.jophiel.api.JophielClientConfiguration;
import judgels.sandalphon.api.SandalphonClientConfiguration;
import org.immutables.value.Value;

@Value.Immutable
@JsonDeserialize(as = ImmutableJerahmeelConfiguration.class)
public interface JerahmeelConfiguration {
    String getBaseDataDir();

    @JsonProperty("jophiel")
    JophielClientConfiguration getJophielConfig();

    @JsonProperty("sandalphon")
    SandalphonClientConfiguration getSandalphonConfig();

    class Builder extends ImmutableJerahmeelConfiguration.Builder {}
}