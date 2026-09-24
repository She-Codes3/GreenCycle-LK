package lk.greencycle.pickup.repository;

import lk.greencycle.pickup.entity.PickupRequest;
import lk.greencycle.pickup.enums.PickupStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PickupRequestRepository extends JpaRepository<PickupRequest, Long> {
    Page<PickupRequest> findByResidentId(Long residentId, Pageable pageable);
    List<PickupRequest> findByStatus(PickupStatus status);
    List<PickupRequest> findByMunicipalityId(Long municipalityId);
    List<PickupRequest> findByAssignedCollectorId(Long collectorId);
    List<PickupRequest> findByRequestedDate(LocalDate date);
}
