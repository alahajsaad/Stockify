package com.alabenhajsaad.api.core.exception;

public class ExpiredRefreshTokenException extends RuntimeException{
    public ExpiredRefreshTokenException(String message) {
        super(message);
    }
}
