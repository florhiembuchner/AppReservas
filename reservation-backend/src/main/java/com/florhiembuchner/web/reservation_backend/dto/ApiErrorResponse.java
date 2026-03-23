package com.florhiembuchner.web.reservation_backend.dto;

import java.time.Instant;

public record ApiErrorResponse(
        int status,
        String error,
        String message,
        Instant timestamp
) {
}
