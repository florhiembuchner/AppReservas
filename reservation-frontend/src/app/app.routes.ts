import { Routes } from '@angular/router';
import { ReservationCreateComponent } from './reservation-create/reservation-create.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

export const routes: Routes = [
  { path: '', component: ReservationListComponent },
  { path: 'reservas', component: ReservationListComponent },
  { path: 'nueva-reserva', component: ReservationCreateComponent },
];
