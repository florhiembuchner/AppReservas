import { Injectable, signal } from '@angular/core';

export type ToastVariant = 'error' | 'success';

/**
 * Shows short-lived toast messages (e.g. API errors).
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _message = signal<string | null>(null);
  private readonly _variant = signal<ToastVariant>('error');
  private hideTimer: ReturnType<typeof setTimeout> | undefined;

  readonly message = this._message.asReadonly();
  readonly variant = this._variant.asReadonly();

  /**
   * Shows an error toast and hides it after a delay.
   *
   * @param text message to display
   * @param durationMs auto-dismiss delay in milliseconds
   */
  showError(text: string, durationMs = 6000): void {
    this.show(text, 'error', durationMs);
  }

  /**
   * Shows a success toast and hides it after a delay.
   *
   * @param text message to display
   * @param durationMs auto-dismiss delay in milliseconds
   */
  showSuccess(text: string, durationMs = 4000): void {
    this.show(text, 'success', durationMs);
  }

  /** Clears the toast immediately. */
  dismiss(): void {
    clearTimeout(this.hideTimer);
    this._message.set(null);
  }

  private show(text: string, variant: ToastVariant, durationMs: number): void {
    clearTimeout(this.hideTimer);
    this._variant.set(variant);
    this._message.set(text);
    this.hideTimer = setTimeout(() => this._message.set(null), durationMs);
  }
}
