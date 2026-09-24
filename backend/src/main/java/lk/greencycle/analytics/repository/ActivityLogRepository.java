package lk.greencycle.analytics.repository;

import lk.greencycle.analytics.entity.ActivityLog;
import lk.greencycle.analytics.enums.ActivityModule;
import lk.greencycle.analytics.enums.ActivitySeverity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Long> {
    Page<ActivityLog> findAllByOrderByCreatedAtDesc(Pageable pageable);
    List<ActivityLog> findByModuleOrderByCreatedAtDesc(ActivityModule module);
    List<ActivityLog> findBySeverityOrderByCreatedAtDesc(ActivitySeverity severity);
    List<ActivityLog> findByPerformedByIdOrderByCreatedAtDesc(Long userId);
}
