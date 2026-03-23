package com.florhiembuchner.web.reservation_backend.exception;

import com.florhiembuchner.web.reservation_backend.dto.ApiErrorResponse;
import java.time.Instant;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Maps business rule violations to an HTTP error response.
     *
     * @param exception the thrown business rule exception
     * @return response entity containing the API error payload
     */
    @ExceptionHandler(BusinessRuleViolationException.class)
    public ResponseEntity<ApiErrorResponse> handleBusinessRuleViolation(BusinessRuleViolationException exception) {
        ApiErrorResponse response = new ApiErrorResponse(
                exception.getStatus().value(),
                exception.getStatus().getReasonPhrase(),
                exception.getMessage(),
                Instant.now()
        );
        return ResponseEntity.status(exception.getStatus()).body(response);
    }
}
