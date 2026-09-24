package lk.greencycle.gamification.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lk.greencycle.common.entity.BaseEntity;
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
@Table(name = "levels")
public class Level extends BaseEntity {

    @Column(name = "level_number", nullable = false, unique = true)
    private Integer levelNumber;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "min_points", nullable = false)
    private Integer minPoints;

    @Column(name = "max_points")
    private Integer maxPoints;

    @Column(name = "badge_icon", length = 255)
    private String badgeIcon;

    @Column(name = "perks", columnDefinition = "TEXT")
    private String perks;
}
