package lk.greencycle.gamification.repository;

import lk.greencycle.gamification.entity.Challenge;
import lk.greencycle.gamification.enums.ChallengeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findByStatus(ChallengeStatus status);
}
