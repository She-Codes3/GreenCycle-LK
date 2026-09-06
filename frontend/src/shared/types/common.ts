export type WasteCategory =
  | 'ORGANIC'
  | 'PLASTIC'
  | 'PAPER'
  | 'GLASS'
  | 'METAL'
  | 'E_WASTE'
  | 'HAZARDOUS'
  | 'OTHER';

export type PickupStatus = 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface LatLng {
  lat: number;
  lng: number;
}
