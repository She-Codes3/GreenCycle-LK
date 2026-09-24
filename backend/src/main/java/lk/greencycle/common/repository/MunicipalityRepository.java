package lk.greencycle.common.repository;

import lk.greencycle.common.entity.Municipality;
import lk.greencycle.common.enums.MunicipalityStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MunicipalityRepository extends JpaRepository<Municipality, Long> {
    Optional<Municipality> findByCode(String code);
    List<Municipality> findByStatus(MunicipalityStatus status);
    List<Municipality> findByDistrict(String district);
    List<Municipality> findByProvince(String province);
}
