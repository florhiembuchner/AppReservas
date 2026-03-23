package com.florhiembuchner.web.reservation_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public record CreateReservationRequest(
        @NotBlank String customerName,
        @NotNull LocalDate date,
        @NotNull LocalTime time,
        @NotBlank String service
) {
}
