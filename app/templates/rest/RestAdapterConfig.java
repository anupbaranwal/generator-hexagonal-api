package <%=group%>.rest.config;

import <%=group%>.domain.MusicReaderService;
import <%=group%>.domain.port.MusicReader;
import <%=group%>.domain.port.MusicRepository;
import org.springframework.context.annotation.Bean;

public class RestAdapterConfig {
    @Bean
    public MusicReader getMusicReader(MusicRepository musicRepository) {
        return new MusicReaderService(musicRepository);
    }
}