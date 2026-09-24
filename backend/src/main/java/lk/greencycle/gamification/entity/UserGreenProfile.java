package lk.greencycle.gamification.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
@Table(name = "user_green_profiles")
public class UserGreenProfile extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "total_points", nullable = false)
    @Builder.Default
    private Integer totalPoints = 0;

    @Column(name = "eco_level", nullable = false)
    @Builder.Default
    private Integer ecoLevel = 1;

    @Column(name = "rank_title", length = 100)
    @Builder.Default
    private String rankTitle = "Eco Novice";

    @Column(name = "monthly_recycled_kg", nullable = false)
    @Builder.Default
    private Double monthlyRecycledKg = 0.0;

    @Column(name = "total_recycled_kg", nullable = false)
    @Builder.Default
    private Double totalRecycledKg = 0.0;

    @Column(name = "streak_days", nullable = false)
    @Builder.Default
    private Integer streakDays = 0;

    @Column(name = "co2_saved_kg", nullable = false)
    @Builder.Default
    private Double co2SavedKg = 0.0;

    @Column(name = "trees_equivalent", nullable = false)
    @Builder.Default
    private Integer treesEquivalent = 0;

    @Column(name = "water_saved_liters", nullable = false)
    @Builder.Default
    private Double waterSavedLiters = 0.0;
}
