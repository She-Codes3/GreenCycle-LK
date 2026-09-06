package lk.greencycle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GreenCycleApplication {

    public static void main(String[] args) {
        SpringApplication.run(GreenCycleApplication.class, args);
    }
}
