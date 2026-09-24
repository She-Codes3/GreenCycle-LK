package lk.greencycle.scanner.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lk.greencycle.common.entity.BaseEntity;
import lk.greencycle.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "ai_scans")
public class AiScan extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "predicted_category", nullable = false, length = 100)
    private String predictedCategory;

    @Column(name = "confidence", nullable = false)
    private Double confidence;

    @Column(name = "matched_item", length = 150)
    private String matchedItem;

    @Column(name = "user_confirmed")
    private Boolean userConfirmed;

    @Column(name = "feedback", length = 255)
    private String feedback;
}
