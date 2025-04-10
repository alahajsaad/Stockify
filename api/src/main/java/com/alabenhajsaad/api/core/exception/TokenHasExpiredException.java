package com.alabenhajsaad.api.core.exception;

public class TokenHasExpiredException extends RuntimeException{
    public TokenHasExpiredException(String message) {
        super(message);
    }
}
