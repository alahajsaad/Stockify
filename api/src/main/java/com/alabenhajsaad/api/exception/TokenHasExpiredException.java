package com.alabenhajsaad.api.exception;

public class TokenHasExpiredException extends RuntimeException{
    public TokenHasExpiredException(String message) {
        super(message);
    }
}
