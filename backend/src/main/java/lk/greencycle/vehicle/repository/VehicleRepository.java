package lk.greencycle.vehicle.repository;

import lk.greencycle.vehicle.entity.Vehicle;
import lk.greencycle.vehicle.enums.VehicleStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    Optional<Vehicle> findByVehicleNumber(String vehicleNumber);
    List<Vehicle> findByCurrentStatus(VehicleStatus status);
    List<Vehicle> findByMunicipalityId(Long municipalityId);
    List<Vehicle> findByAssignedCollectorId(Long collectorId);
}
