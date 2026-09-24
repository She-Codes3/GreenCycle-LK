package lk.greencycle.schedule.repository;

import lk.greencycle.schedule.entity.CollectionSchedule;
import lk.greencycle.schedule.enums.ScheduleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;

@Repository
public interface CollectionScheduleRepository extends JpaRepository<CollectionSchedule, Long> {
    List<CollectionSchedule> findByZoneId(Long zoneId);
    List<CollectionSchedule> findByZoneIdAndDayOfWeek(Long zoneId, DayOfWeek dayOfWeek);
    List<CollectionSchedule> findByStatus(ScheduleStatus status);
}
