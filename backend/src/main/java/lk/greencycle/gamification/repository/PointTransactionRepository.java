package lk.greencycle.gamification.repository;

import lk.greencycle.gamification.entity.PointTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PointTransactionRepository extends JpaRepository<PointTransaction, Long> {
    Page<PointTransaction> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    List<PointTransaction> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<PointTransaction> findByUserIdAndSourceType(Long userId, String sourceType);
}
