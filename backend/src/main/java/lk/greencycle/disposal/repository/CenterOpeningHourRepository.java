package lk.greencycle.disposal.repository;

import lk.greencycle.disposal.entity.CenterOpeningHour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CenterOpeningHourRepository extends JpaRepository<CenterOpeningHour, Long> {
    List<CenterOpeningHour> findByDisposalCenterId(Long centerId);
}
