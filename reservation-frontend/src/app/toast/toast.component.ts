import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

/**
 * Fixed-position toast driven by {@link ToastService}.
 */
@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  protected readonly toast = inject(ToastService);
}
