package <%=group%>.config;

import <%=group%>.infra.config.<% if(jpaSupport){%>JpaAdapterConfig<%} else {%>HardcodedAdapterConfig<%}%>;
import <%=group%>.rest.config.RestAdapterConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import({RestAdapterConfig.class,
        <% if(jpaSupport){%>JpaAdapterConfig.class<%} else {%>HardcodedAdapterConfig.class<%}%>})
public class BootstrapConfig {}
