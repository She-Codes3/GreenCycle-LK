export type WasteCategoryType =
  | 'Organic'
  | 'Paper'
  | 'Plastic'
  | 'Glass'
  | 'Metal'
  | 'E-Waste'
  | 'Hazardous'
  | 'Bulky'
  | 'General Residual';

/** All waste categories available for filtering. */
export const ALL_WASTE_CATEGORIES: WasteCategoryType[] = [
  'Organic',
  'Paper',
  'Plastic',
  'Glass',
  'Metal',
  'E-Waste',
  'Hazardous',
  'Bulky',
  'General Residual',
];

export interface DetailedWasteStream {
  id: string;
  name: string;
  streamCode: string;
  description: string;
  rule: string;
  points: string;
  icon: string;
  badgeClass?: string;
  ruleClass?: string;
}

export interface CenterSupervisor {
  name: string;
  title: string;
  division: string;
  avatarUrl?: string;
}

export interface CenterReview {
  id: string;
  author: string;
  role: string;
  timeAgo: string;
  rating: number;
  content: string;
  intakeWeight: string;
  pointsEarned: string;
  bay: string;
  avatarUrl?: string;
}

export interface CenterFieldNote {
  author: string;
  note: string;
  timeAgo: string;
}

export interface DisposalCenterSchedule {
  day: string;
  hours: string;
  isOpen: boolean;
  isToday?: boolean;
}

/**
 * Opening hours for each day of the week.
 * `open` and `close` are in 24-hour "HH:MM" format, e.g. "08:00".
 * If `closed` is true, the center is closed that day.
 */
export interface DayOpeningHours {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  open: string;
  close: string;
  closed?: boolean;
}

/**
 * Core disposal center data structure.
 * Designed to be backend-replaceable without UI changes.
 */
export interface DisposalCenter {
  /** Unique identifier (slug-style for URLs). */
  id: string;
  /** Short reference code, e.g. "DC001". */
  code?: string;
  /** Display name. */
  name: string;
  /** Facility type label. */
  type: string;
  /** Street address. */
  address: string;
  /** City name. */
  city: string;
  /** Administrative district. */
  district: string;
  /** Display area/suburb label. */
  area: string;
  /** Optional ward/zone classification. */
  wardZone?: string;
  /** Optional corridor description. */
  corridor?: string;
  /** Geographic latitude (WGS-84). */
  latitude: number;
  /** Geographic longitude (WGS-84). */
  longitude: number;
  /** Contact phone number. */
  phone?: string;
  /** Contact email address. */
  email?: string;
  /** List of accepted waste category types. */
  acceptedWasteTypes: WasteCategoryType[];
  /** Structured opening hours per day of week. */
  openingHours: DayOpeningHours[];
  /** Human-readable opening hours string for display. */
  openingHoursDisplay: string;
  /** Whether collection service is available at this center. */
  collectionAvailable: boolean;
  /** Whether drop-off is available at this center. */
  dropOffAvailable: boolean;
  /** Waste stream group classification for group filtering. */
  streamGroup: 'all' | 'recycling' | 'organic' | 'hazardous' | 'bulky';
  /** Capacity status indicator. */
  capacityStatus?: 'LOW' | 'NORMAL' | 'NEAR_CAPACITY' | 'FULL';
  /** Telemetry capacity percentage (0-100). */
  telemetryCapacityPct?: number;
  /** Telemetry status display string. */
  telemetryStatus?: string;

  // --- Presentation / detail-page fields (populated from data, not hardcoded in UI) ---
  verifiedGrade?: string;
  heroImageUrl?: string;
  hubBadge?: string;
  facilityCodeTag?: string;
  subHubTitle?: string;
  solarPowered?: boolean;
  rating?: number;
  evaluationsCount?: number;
  supervisor?: CenterSupervisor;
  /** Detailed schedule for the detail page operating-hours table. */
  schedule?: DisposalCenterSchedule[];
  amenities?: string[];
  detailedWasteStreams?: DetailedWasteStream[];
  reviews?: CenterReview[];
  fieldNotes?: CenterFieldNote[];
}

export interface DisposalFilterState {
  keyword: string;
  streamGroup: string;
  acceptedItems: WasteCategoryType[];
  openNowOnly: boolean;
  distanceRadius: number;
}

export type DisposalSortOption = 'nearest' | 'name' | 'open';

/**
 * A DisposalCenter enriched with computed runtime fields.
 * This is what components receive after processing.
 */
export interface DisposalCenterView extends DisposalCenter {
  /** Computed distance from user location in kilometers. */
  distanceKm: number;
  /** Computed: whether the center is currently open based on openingHours + current time. */
  isOpen: boolean;
  /** Computed: human-readable next status text, e.g. "Opens tomorrow at 8:00 AM". */
  nextStatusText?: string;
}
