package com.florhiembuchner.web.reservation_backend.controller;

import com.florhiembuchner.web.reservation_backend.dto.CreateReservationRequest;
import com.florhiembuchner.web.reservation_backend.dto.ReservationResponse;
import com.florhiembuchner.web.reservation_backend.entity.Reservation;
import com.florhiembuchner.web.reservation_backend.service.ReservationService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reservas")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    /**
     * Returns all reservations in the system.
     *
     * @return list of reservations
     */
    @GetMapping
    public ResponseEntity<List<ReservationResponse>> getAllReservations() {
        List<ReservationResponse> response = reservationService.getAllReservations().stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(response);
    }

    /**
     * Creates a new reservation when business rules are satisfied.
     *
     * @param request the incoming reservation payload
     * @return the created reservation with location header
     */
    @PostMapping
    public ResponseEntity<ReservationResponse> createReservation(@Valid @RequestBody CreateReservationRequest request) {
        Reservation reservation = new Reservation();
        reservation.setCustomerName(request.customerName());
        reservation.setDate(request.date());
        reservation.setTime(request.time());
        reservation.setService(request.service());

        Reservation created = reservationService.createReservation(reservation);
        ReservationResponse response = toResponse(created);
        URI location = URI.create("/reservas/" + created.getId());
        return ResponseEntity.created(location).body(response);
    }

    /**
     * Cancels a reservation by its identifier.
     *
     * @param id reservation identifier
     * @return no-content response when cancellation succeeds
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.noContent().build();
    }

    private ReservationResponse toResponse(Reservation reservation) {
        return new ReservationResponse(
                reservation.getId(),
                reservation.getCustomerName(),
                reservation.getDate(),
                reservation.getTime(),
                reservation.getService(),
                reservation.getStatus()
        );
    }
}
