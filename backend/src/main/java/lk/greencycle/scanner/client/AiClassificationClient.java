package lk.greencycle.scanner.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

/**
 * Client for the ai-service classification endpoint (see ai-service/app/api/routes/classify.py).
 */
@Component
public class AiClassificationClient {

    private final RestClient restClient;

    public AiClassificationClient(@Value("${app.ai-service.base-url}") String baseUrl) {
        this.restClient = RestClient.builder().baseUrl(baseUrl).build();
    }

    public AiClassificationResult classify(byte[] imageBytes, String filename) {
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(imageBytes) {
            @Override
            public String getFilename() {
                return filename;
            }
        });

        return restClient.post()
                .uri("/api/classify")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .headers(headers -> headers.setAccept(java.util.List.of(MediaType.APPLICATION_JSON)))
                .body(body)
                .retrieve()
                .body(AiClassificationResult.class);
    }

    public record AiClassificationResult(String category, double confidence) {
    }
}
