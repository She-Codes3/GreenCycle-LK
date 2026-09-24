package lk.greencycle.gamification.repository;

import lk.greencycle.gamification.entity.ResidentWasteLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ResidentWasteLogRepository extends JpaRepository<ResidentWasteLog, Long> {
    Page<ResidentWasteLog> findByResidentId(Long residentId, Pageable pageable);
    List<ResidentWasteLog> findByResidentIdOrderByLogDateDesc(Long residentId);
    List<ResidentWasteLog> findByResidentIdAndLogDateBetween(Long residentId, LocalDate startDate, LocalDate endDate);
}
