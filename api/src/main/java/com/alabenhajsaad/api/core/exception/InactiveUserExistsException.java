package com.alabenhajsaad.api.core.exception;

public class InactiveUserExistsException extends RuntimeException {
    public InactiveUserExistsException(String message){
        super(message);
    }
}
