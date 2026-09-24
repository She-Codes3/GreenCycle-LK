package lk.greencycle.pickup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lk.greencycle.common.entity.BaseEntity;
import lk.greencycle.common.entity.Municipality;
import lk.greencycle.common.entity.WasteCategory;
import lk.greencycle.pickup.enums.PickupStatus;
import lk.greencycle.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "pickup_requests")
public class PickupRequest extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resident_id", nullable = false)
    private User resident;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "waste_category_id")
    private WasteCategory wasteCategory;

    @Column(name = "waste_type", nullable = false, length = 100)
    private String wasteType;

    @Column(name = "quantity", nullable = false, length = 100)
    private String quantity;

    @Column(name = "estimated_weight_kg")
    private Double estimatedWeightKg;

    @Column(name = "location", nullable = false, length = 255)
    private String location;

    @Column(name = "area", length = 100)
    private String area;

    @Column(name = "city", length = 100)
    private String city;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "municipality_id")
    private Municipality municipality;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    @Builder.Default
    private PickupStatus status = PickupStatus.PENDING;

    @Column(name = "requested_date", nullable = false)
    private LocalDate requestedDate;

    @Column(name = "preferred_time_slot", length = 50)
    private String preferredTimeSlot;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_collector_id")
    private User assignedCollector;

    @Column(name = "contact_phone", length = 30)
    private String contactPhone;
}
