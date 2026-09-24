package lk.greencycle.tracking.repository;

import lk.greencycle.tracking.entity.VehicleLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleLocationRepository extends JpaRepository<VehicleLocation, Long> {
    List<VehicleLocation> findByTripIdOrderByRecordedAtAsc(Long tripId);
    Optional<VehicleLocation> findFirstByTripIdOrderByRecordedAtDesc(Long tripId);
}
