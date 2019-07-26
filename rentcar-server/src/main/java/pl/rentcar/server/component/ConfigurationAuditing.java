package pl.rentcar.server.component;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.context.SecurityContextHolder;
import pl.rentcar.server.entity.EntityUser;

import java.util.Optional;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class ConfigurationAuditing {

    @Bean
    public AuditorAware<EntityUser> auditorProvider() {
        try {
            Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (user != null) {
                try {
                    return () -> Optional.ofNullable((EntityUser) user);
                } catch (Throwable t) {
                    t.printStackTrace();
                    return () -> Optional.empty();
                }
            }
            return () -> Optional.empty();
        } catch (Throwable t) {
            return () -> Optional.empty();
        }
    }

}
