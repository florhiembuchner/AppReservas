/** Mirrors backend `ReservationStatus`. */
export enum ReservationStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
}

/** Mirrors backend `ReservationResponse` (JSON dates/times as strings). */
export interface ReservationResponse {
  id: number;
  customerName: string;
  date: string;
  time: string;
  service: string;
  status: ReservationStatus;
}

/** Payload for creating a reservation; mirrors backend `CreateReservationRequest`. */
export interface CreateReservationRequest {
  customerName: string;
  /** ISO date string, e.g. `2026-03-28`. */
  date: string;
  /** Local time string, e.g. `14:30:00`. */
  time: string;
  service: string;
}
