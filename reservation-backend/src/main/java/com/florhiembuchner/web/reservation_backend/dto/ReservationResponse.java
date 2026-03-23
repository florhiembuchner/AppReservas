package com.florhiembuchner.web.reservation_backend.dto;

import com.florhiembuchner.web.reservation_backend.entity.ReservationStatus;
import java.time.LocalDate;
import java.time.LocalTime;

public record ReservationResponse(
        Long id,
        String customerName,
        LocalDate date,
        LocalTime time,
        String service,
        ReservationStatus status
) {
}
