import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AVAILABLE_SERVICES } from '../constants/available-services';
import type { CreateReservationRequest } from '../models/reservation.model';
import { ReservaService } from '../services/reserva.service';
import { ToastService } from '../toast/toast.service';

/**
 * Reactive form to create a reservation via {@link ReservaService#create}.
 */
@Component({
  selector: 'app-reservation-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reservation-create.component.html',
  styleUrl: './reservation-create.component.css',
})
export class ReservationCreateComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly reservaService = inject(ReservaService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly availableServices = AVAILABLE_SERVICES;

  protected readonly form = this.fb.group({
    nombreCliente: this.fb.control('', { validators: [Validators.required] }),
    fecha: this.fb.control('', { validators: [Validators.required] }),
    hora: this.fb.control('', { validators: [Validators.required] }),
    servicio: this.fb.control('', { validators: [Validators.required] }),
  });

  protected saving = false;

  /**
   * Submits the form and calls the API; on failure shows a toast with the error message.
   */
  protected onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.saving) {
      return;
    }

    const v = this.form.getRawValue();
    const request: CreateReservationRequest = {
      customerName: v.nombreCliente.trim(),
      date: v.fecha,
      time: this.normalizeTime(v.hora),
      service: v.servicio,
    };

    this.saving = true;
    this.reservaService.create(request).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/reservas']);
      },
      error: (err: unknown) => {
        this.saving = false;
        this.toast.showError(this.parseHttpError(err));
      },
    });
  }

  /**
   * Ensures time is sent as `HH:mm:ss` for Jackson `LocalTime` parsing.
   *
   * @param value value from `<input type="time">` (typically `HH:mm`)
   */
  private normalizeTime(value: string): string {
    if (value.length === 5) {
      return `${value}:00`;
    }
    return value;
  }

  /**
   * Extracts a user-facing message from an HTTP error (e.g. {@link ApiErrorResponse} body).
   *
   * @param err error from HttpClient
   * @returns message for the toast
   */
  private parseHttpError(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      const body = err.error;
      if (body && typeof body === 'object' && 'message' in body) {
        const message = (body as { message?: unknown }).message;
        if (typeof message === 'string' && message.trim().length > 0) {
          return message;
        }
      }
      if (err.status === 0) {
        return 'No se pudo conectar con el servidor.';
      }
      return err.message || 'No se pudo guardar la reserva.';
    }
    return 'No se pudo guardar la reserva.';
  }
}
