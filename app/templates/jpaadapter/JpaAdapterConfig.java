package <%=group%>.infra.config;

import <%=group%>.domain.port.MusicRepository;
import <%=group%>.infra.RealTimeMusicRepository;
import <%=group%>.infra.dao.MusicDao;
import org.springframework.context.annotation.Bean;

public class JpaAdapterConfig {
    @Bean
    public MusicRepository realTimeMusicRepository(MusicDao musicDao) {
        return new RealTimeMusicRepository(musicDao);
    }
}
