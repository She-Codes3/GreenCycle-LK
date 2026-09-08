package lk.greencycle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GreenCycleApplication {

    public static void main(String[] args) {
        SpringApplication.run(GreenCycleApplication.class, args);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onReady() {
        System.out.println(
            "\n====================================================================\n" +
            "  🌿 GreenCycle LK Backend is SUCCESSFULLY up and running!\n" +
            "  🌐 Web Application: http://localhost\n" +
            "  📚 Swagger API UI:  http://localhost:8080/swagger-ui.html\n" +
            "  🤖 AI Service:      http://localhost:8000/docs\n" +
            "====================================================================\n"
        );
    }
}
