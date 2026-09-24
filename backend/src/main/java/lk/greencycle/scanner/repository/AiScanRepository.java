package lk.greencycle.scanner.repository;

import lk.greencycle.scanner.entity.AiScan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AiScanRepository extends JpaRepository<AiScan, Long> {
    Page<AiScan> findByUserId(Long userId, Pageable pageable);
    List<AiScan> findByUserIdOrderByCreatedAtDesc(Long userId);
}
