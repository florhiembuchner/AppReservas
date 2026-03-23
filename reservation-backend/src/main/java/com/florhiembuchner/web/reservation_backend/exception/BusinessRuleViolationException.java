package com.florhiembuchner.web.reservation_backend.exception;

import org.springframework.http.HttpStatus;

public class BusinessRuleViolationException extends RuntimeException {

    private final HttpStatus status;

    public BusinessRuleViolationException(String message) {
        this(message, HttpStatus.CONFLICT);
    }

    public BusinessRuleViolationException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
