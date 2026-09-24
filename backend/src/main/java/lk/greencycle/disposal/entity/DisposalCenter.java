package lk.greencycle.disposal.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lk.greencycle.common.entity.BaseEntity;
import lk.greencycle.common.entity.Municipality;
import lk.greencycle.common.entity.WasteCategory;
import lk.greencycle.disposal.enums.CapacityStatus;
import lk.greencycle.disposal.enums.DisposalCenterStatus;
import lk.greencycle.disposal.enums.StreamGroup;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "disposal_centers")
public class DisposalCenter extends BaseEntity {

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "code", nullable = false, unique = true, length = 50)
    private String code;

    @Column(name = "type", nullable = false, length = 50)
    private String type;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @Column(name = "district", nullable = false, length = 100)
    private String district;

    @Column(name = "area", length = 100)
    private String area;

    @Column(name = "ward_zone", length = 100)
    private String wardZone;

    @Column(name = "corridor", length = 100)
    private String corridor;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "phone", length = 50)
    private String phone;

    @Column(name = "email", length = 150)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "capacity_status", nullable = false, length = 30)
    @Builder.Default
    private CapacityStatus capacityStatus = CapacityStatus.NORMAL;

    @Column(name = "collection_available", nullable = false)
    @Builder.Default
    private Boolean collectionAvailable = false;

    @Column(name = "drop_off_available", nullable = false)
    @Builder.Default
    private Boolean dropOffAvailable = true;

    @Enumerated(EnumType.STRING)
    @Column(name = "stream_group", nullable = false, length = 30)
    @Builder.Default
    private StreamGroup streamGroup = StreamGroup.ALL;

    @Column(name = "rating")
    @Builder.Default
    private Double rating = 0.0;

    @Column(name = "solar_powered", nullable = false)
    @Builder.Default
    private Boolean solarPowered = false;

    @Column(name = "hero_image_url", length = 500)
    private String heroImageUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    @Builder.Default
    private DisposalCenterStatus status = DisposalCenterStatus.OPERATIONAL;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "municipality_id")
    private Municipality municipality;

    @ManyToMany
    @JoinTable(
            name = "center_accepted_wastes",
            joinColumns = @JoinColumn(name = "center_id"),
            inverseJoinColumns = @JoinColumn(name = "waste_category_id")
    )
    @Builder.Default
    private Set<WasteCategory> acceptedWastes = new HashSet<>();

    @OneToMany(mappedBy = "disposalCenter", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<CenterOpeningHour> openingHours = new ArrayList<>();
}
