package com.florhiembuchner.web.reservation_backend.service;

import com.florhiembuchner.web.reservation_backend.entity.Reservation;
import com.florhiembuchner.web.reservation_backend.entity.ReservationStatus;
import com.florhiembuchner.web.reservation_backend.exception.BusinessRuleViolationException;
import com.florhiembuchner.web.reservation_backend.repository.ReservationRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReservationService {
    /**
     * Lists all reservations in the system.
     *
     * @return all reservations
     */
    @Transactional(readOnly = true)
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }


    private final ReservationRepository reservationRepository;

    /**
     * Creates a reservation only if no other reservation exists for the same date and time.
     *
     * @param reservation the reservation data to persist
     * @return the created reservation
     * @throws BusinessRuleViolationException when the date/time slot is already taken
     */
    @Transactional
    public Reservation createReservation(Reservation reservation) {
        boolean slotAlreadyTaken =
                reservationRepository.existsByDateAndTime(reservation.getDate(), reservation.getTime());
        if (slotAlreadyTaken) {
            throw new BusinessRuleViolationException(
                    "A reservation already exists for the provided date and time.");
        }

        if (reservation.getStatus() == null) {
            reservation.setStatus(ReservationStatus.ACTIVE);
        }

        return reservationRepository.save(reservation);
    }

    /**
     * Cancels an existing reservation by id.
     *
     * @param reservationId the reservation identifier
     * @return the updated reservation with canceled status
     * @throws BusinessRuleViolationException when reservation does not exist or is already canceled
     */
    @Transactional
    public Reservation cancelReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new BusinessRuleViolationException("Reservation not found.", HttpStatus.NOT_FOUND));

        if (reservation.getStatus() == ReservationStatus.CANCELED) {
            throw new BusinessRuleViolationException("Reservation is already canceled.");
        }

        reservation.setStatus(ReservationStatus.CANCELED);
        return reservationRepository.save(reservation);
    }
}
