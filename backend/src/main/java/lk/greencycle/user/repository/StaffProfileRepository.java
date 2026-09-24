package lk.greencycle.user.repository;

import lk.greencycle.user.entity.StaffProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StaffProfileRepository extends JpaRepository<StaffProfile, Long> {
    Optional<StaffProfile> findByUserId(Long userId);
    Optional<StaffProfile> findByEmployeeId(String employeeId);
    List<StaffProfile> findByMunicipalityId(Long municipalityId);
}
