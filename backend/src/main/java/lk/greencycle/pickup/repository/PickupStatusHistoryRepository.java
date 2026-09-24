package lk.greencycle.pickup.repository;

import lk.greencycle.pickup.entity.PickupStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PickupStatusHistoryRepository extends JpaRepository<PickupStatusHistory, Long> {
    List<PickupStatusHistory> findByPickupRequestIdOrderByChangedAtAsc(Long pickupRequestId);
}
