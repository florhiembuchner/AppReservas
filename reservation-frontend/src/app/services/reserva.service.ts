import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { CreateReservationRequest, ReservationResponse } from '../models/reservation.model';

/**
 * Client for reservation REST endpoints on the Spring Boot backend.
 */
@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/reservas`;

  /**
   * Returns all reservations.
   *
   * @returns observable of the reservation list
   */
  getAll(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(this.baseUrl);
  }

  /**
   * Creates a new reservation.
   *
   * @param request reservation payload
   * @returns observable of the created reservation body
   */
  create(request: CreateReservationRequest): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(this.baseUrl, request);
  }

  /**
   * Cancels a reservation by id (backend returns 204 No Content).
   *
   * @param id reservation identifier
   * @returns observable that completes when cancellation succeeds
   */
  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
