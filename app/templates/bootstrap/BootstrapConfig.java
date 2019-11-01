package <%=group%>.config;

import <%=group%>.infra.config.<% if(jpaSupport){%>JpaAdapterConfig<%} else {%>HardcodedAdapterConfig<%}%>;
import <%=group%>.domain.MusicReaderService;
import <%=group%>.domain.port.MusicReader;
import <%=group%>.domain.port.MusicRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(<% if(jpaSupport){%>JpaAdapterConfig.class<%} else {%>HardcodedAdapterConfig.class<%}%>)
public class BootstrapConfig {
  @Bean
  public MusicReader getMusicReader(MusicRepository musicRepository) {
    return new MusicReaderService(musicRepository);
  }
}
