package lk.greencycle.gamification.repository;

import lk.greencycle.gamification.entity.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {
    List<Reward> findByActiveTrue();
    List<Reward> findByCategoryAndActiveTrue(String category);
}
