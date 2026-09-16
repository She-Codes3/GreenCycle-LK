import {
  DisposalCenter,
  DisposalCenterView,
  DisposalFilterState,
  DisposalSortOption,
  DayOpeningHours,
} from '../types/disposal';

// ---------- Demo user location (Havelock Town, Colombo 05) ----------
const USER_LAT = 6.8885;
const USER_LNG = 79.8625;

// ---------- Haversine distance ----------

/** Returns distance in kilometres between two lat/lng points. */
export function haversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ---------- Open-now computation ----------

const DAY_MAP: Record<number, DayOpeningHours['day']> = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
};

/** Checks whether a center is currently open based on its structured opening hours. */
export function isCenterOpenNow(hours: DayOpeningHours[]): boolean {
  const now = new Date();
  const dayName = DAY_MAP[now.getDay()];
  const todayHours = hours.find((h) => h.day === dayName);

  if (!todayHours || todayHours.closed) return false;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [openH, openM] = todayHours.open.split(':').map(Number);
  const [closeH, closeM] = todayHours.close.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

/** Generates a human-readable next-status string for closed centers. */
function getNextStatusText(hours: DayOpeningHours[]): string | undefined {
  const now = new Date();
  const currentDayIdx = now.getDay();

  // Look ahead up to 7 days for the next open slot
  for (let offset = 1; offset <= 7; offset++) {
    const futureIdx = (currentDayIdx + offset) % 7;
    const dayName = DAY_MAP[futureIdx];
    const dayHours = hours.find((h) => h.day === dayName);
    if (dayHours && !dayHours.closed) {
      const label = offset === 1 ? 'tomorrow' : `on ${dayName.charAt(0).toUpperCase() + dayName.slice(1)}`;
      // Format open time to 12h
      const [h, m] = dayHours.open.split(':').map(Number);
      const suffix = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      const timeStr = m === 0 ? `${h12}:00 ${suffix}` : `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
      return `Opens ${label} at ${timeStr}`;
    }
  }
  return undefined;
}

// ---------- Enrich raw center → view ----------

/**
 * Converts raw `DisposalCenter` data into `DisposalCenterView` objects
 * with computed distance and open-now status.
 *
 * When the backend is integrated, the API response will be mapped
 * through this function so the UI components stay unchanged.
 */
export function enrichCenter(
  center: DisposalCenter,
  userLat = USER_LAT,
  userLng = USER_LNG
): DisposalCenterView {
  const distanceKm = parseFloat(
    haversineDistanceKm(userLat, userLng, center.latitude, center.longitude).toFixed(1)
  );
  const isOpen = isCenterOpenNow(center.openingHours);
  const nextStatusText = isOpen ? undefined : getNextStatusText(center.openingHours);

  return { ...center, distanceKm, isOpen, nextStatusText };
}

/**
 * Converts raw `DisposalCenter` data into `DisposalCenterView` objects
 * with computed distance and open-now status.
 *
 * When the backend is integrated, the API response will be mapped
 * through this function so the UI components stay unchanged.
 */
export function enrichCenters(
  centers: DisposalCenter[],
  userLat = USER_LAT,
  userLng = USER_LNG
): DisposalCenterView[] {
  return centers.map((center) => enrichCenter(center, userLat, userLng));
}

// ---------- Filtering ----------

export function filterDisposalCenters(
  centers: DisposalCenterView[],
  filters: DisposalFilterState
): DisposalCenterView[] {
  return centers.filter((center) => {
    // 1. Keyword search (name, address, city, district, area, accepted waste types)
    if (filters.keyword.trim()) {
      const q = filters.keyword.toLowerCase().trim();
      const searchFields = [
        center.name,
        center.address,
        center.area,
        center.city,
        center.district,
      ];
      const matchesText = searchFields.some((field) =>
        field.toLowerCase().includes(q)
      );
      const matchesWaste = center.acceptedWasteTypes.some((wt) =>
        wt.toLowerCase().includes(q)
      );
      if (!matchesText && !matchesWaste) {
        return false;
      }
    }

    // 2. Waste stream group filter
    if (filters.streamGroup && filters.streamGroup !== 'all') {
      if (center.streamGroup !== filters.streamGroup) {
        return false;
      }
    }

    // 3. Accepted items multi-select checkboxes
    if (filters.acceptedItems.length > 0) {
      const hasMatchingCategory = filters.acceptedItems.some((cat) =>
        center.acceptedWasteTypes.some((wt) =>
          wt.toLowerCase().includes(cat.toLowerCase())
        )
      );
      if (!hasMatchingCategory) {
        return false;
      }
    }

    // 4. Open now only filter (uses computed isOpen)
    if (filters.openNowOnly && !center.isOpen) {
      return false;
    }

    // 5. Distance radius filter (uses computed distanceKm)
    if (center.distanceKm > filters.distanceRadius) {
      return false;
    }

    return true;
  });
}

// ---------- Sorting ----------

export function sortDisposalCenters(
  centers: DisposalCenterView[],
  sortBy: DisposalSortOption
): DisposalCenterView[] {
  const cloned = [...centers];
  switch (sortBy) {
    case 'nearest':
      return cloned.sort((a, b) => a.distanceKm - b.distanceKm);
    case 'name':
      return cloned.sort((a, b) => a.name.localeCompare(b.name));
    case 'open':
      return cloned.sort((a, b) => {
        if (a.isOpen && !b.isOpen) return -1;
        if (!a.isOpen && b.isOpen) return 1;
        return a.distanceKm - b.distanceKm;
      });
    default:
      return cloned;
  }
}
