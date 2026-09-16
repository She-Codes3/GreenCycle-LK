import { DisposalCenter, DisposalFilterState, DisposalSortOption } from '../types/disposal';

export function filterDisposalCenters(
  centers: DisposalCenter[],
  filters: DisposalFilterState
): DisposalCenter[] {
  return centers.filter((center) => {
    // 1. Keyword search (name, address, area, accepted waste types)
    if (filters.keyword.trim()) {
      const q = filters.keyword.toLowerCase().trim();
      const matchesName = center.name.toLowerCase().includes(q);
      const matchesAddress = center.address.toLowerCase().includes(q);
      const matchesArea = center.area.toLowerCase().includes(q);
      const matchesWaste = center.acceptedWasteTypes.some((wt) =>
        wt.toLowerCase().includes(q)
      );
      if (!matchesName && !matchesAddress && !matchesArea && !matchesWaste) {
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

    // 4. Open now only filter
    if (filters.openNowOnly && !center.isOpen) {
      return false;
    }

    // 5. Distance radius filter
    if (center.distanceKm > filters.distanceRadius) {
      return false;
    }

    return true;
  });
}

export function sortDisposalCenters(
  centers: DisposalCenter[],
  sortBy: DisposalSortOption
): DisposalCenter[] {
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
