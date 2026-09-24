package lk.greencycle.gamification.repository;

import lk.greencycle.gamification.entity.UserGreenProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserGreenProfileRepository extends JpaRepository<UserGreenProfile, Long> {
    Optional<UserGreenProfile> findByUserId(Long userId);
    List<UserGreenProfile> findTop10ByOrderByTotalPointsDesc();
}
