package <%=group%>.infra.config;

import <%=group%>.domain.port.MusicRepository;
import <%=group%>.infra.HardcodedMusicRepository;
import org.springframework.context.annotation.Bean;

public class HardcodedAdapterConfig {
    @Bean
    public MusicRepository hardCodedMusicRepository() {
        return new HardcodedMusicRepository();
    }
}