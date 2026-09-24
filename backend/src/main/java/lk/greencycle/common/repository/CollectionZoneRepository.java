package lk.greencycle.common.repository;

import lk.greencycle.common.entity.CollectionZone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CollectionZoneRepository extends JpaRepository<CollectionZone, Long> {
    Optional<CollectionZone> findByCode(String code);
    List<CollectionZone> findByMunicipalityId(Long municipalityId);
}
