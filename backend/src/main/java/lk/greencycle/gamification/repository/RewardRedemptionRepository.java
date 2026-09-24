package lk.greencycle.gamification.repository;

import lk.greencycle.gamification.entity.RewardRedemption;
import lk.greencycle.gamification.enums.RedemptionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RewardRedemptionRepository extends JpaRepository<RewardRedemption, Long> {
    Optional<RewardRedemption> findByRedemptionCode(String redemptionCode);
    List<RewardRedemption> findByUserIdOrderByRedeemedAtDesc(Long userId);
    List<RewardRedemption> findByStatus(RedemptionStatus status);
}
