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

export interface DisposalCenter {
  id: string;
  code?: string;
  name: string;
  type: string;
  address: string;
  area: string;
  wardZone?: string;
  corridor?: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  openingHours: string;
  isOpen: boolean;
  nextStatusText?: string;
  streamGroup: 'all' | 'recycling' | 'organic' | 'hazardous' | 'bulky';
  acceptedWasteTypes: string[];
  phone?: string;
  email?: string;
  capacityStatus?: 'LOW' | 'NORMAL' | 'NEAR_CAPACITY' | 'FULL';
  telemetryCapacityPct?: number;
  telemetryStatus?: string;
  heroImageUrl?: string;
  hubBadge?: string;
  facilityCodeTag?: string;
  subHubTitle?: string;
  solarPowered?: boolean;
  verifiedGrade?: string;
  rating?: number;
  evaluationsCount?: number;
  supervisor?: CenterSupervisor;
  schedule?: DisposalCenterSchedule[];
  amenities?: string[];
  detailedWasteStreams?: DetailedWasteStream[];
  reviews?: CenterReview[];
  fieldNotes?: CenterFieldNote[];
}

export interface DisposalFilterState {
  keyword: string;
  streamGroup: string;
  acceptedItems: string[];
  openNowOnly: boolean;
  distanceRadius: number;
}

export type DisposalSortOption = 'nearest' | 'name' | 'open';
