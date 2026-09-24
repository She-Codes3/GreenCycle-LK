package lk.greencycle.disposal.repository;

import lk.greencycle.disposal.entity.DisposalCenter;
import lk.greencycle.disposal.enums.CapacityStatus;
import lk.greencycle.disposal.enums.DisposalCenterStatus;
import lk.greencycle.disposal.enums.StreamGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DisposalCenterRepository extends JpaRepository<DisposalCenter, Long> {
    Optional<DisposalCenter> findByCode(String code);
    List<DisposalCenter> findByStatus(DisposalCenterStatus status);
    List<DisposalCenter> findByCityIgnoreCase(String city);
    List<DisposalCenter> findByDistrictIgnoreCase(String district);
    List<DisposalCenter> findByCapacityStatus(CapacityStatus capacityStatus);
    List<DisposalCenter> findByStreamGroup(StreamGroup streamGroup);
    List<DisposalCenter> findByMunicipalityId(Long municipalityId);
}
