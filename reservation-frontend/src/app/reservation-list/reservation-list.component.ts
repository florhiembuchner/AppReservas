import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservaService } from '../services/reserva.service';
import { ReservationResponse, ReservationStatus } from '../models/reservation.model';

/**
 * Lists reservations from the API and allows canceling active ones.
 */
@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit {
  private readonly reservaService = inject(ReservaService);

  protected readonly ReservationStatus = ReservationStatus;

  protected readonly reservations = signal<ReservationResponse[]>([]);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly cancelingId = signal<number | null>(null);

  ngOnInit(): void {
    this.loadReservations();
  }

  /**
   * Loads all reservations from the backend.
   */
  protected loadReservations(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.reservaService.getAll().subscribe({
      next: (data) => {
        this.reservations.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar las reservas. ¿Está el backend en ejecución?');
        this.loading.set(false);
      },
    });
  }

  /**
   * Cancels a reservation and refreshes the list on success.
   *
   * @param id reservation identifier
   */
  protected onCancel(id: number): void {
    this.cancelingId.set(id);
    this.errorMessage.set(null);
    this.reservaService.cancel(id).subscribe({
      next: () => {
        this.cancelingId.set(null);
        this.loadReservations();
      },
      error: () => {
        this.cancelingId.set(null);
        this.errorMessage.set('No se pudo cancelar la reserva.');
      },
    });
  }
}
