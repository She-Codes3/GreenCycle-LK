package lk.greencycle.tracking.repository;

import lk.greencycle.tracking.entity.CollectionTrip;
import lk.greencycle.tracking.enums.TripStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CollectionTripRepository extends JpaRepository<CollectionTrip, Long> {
    List<CollectionTrip> findByCollectorId(Long collectorId);
    List<CollectionTrip> findByVehicleId(Long vehicleId);
    List<CollectionTrip> findByTripDate(LocalDate tripDate);
    List<CollectionTrip> findByStatus(TripStatus status);
}
