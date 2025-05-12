package com.alabenhajsaad.api.core.exception;

import com.alabenhajsaad.api.config.ApiResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

//@Hidden
@RestControllerAdvice
public class GlobalExceptionHandler {
    // Handles validation for @RequestParam, @PathVariable, etc.
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException e) {
        return new ResponseEntity<>("Validation error:"+e.getMessage(), HttpStatus.BAD_REQUEST) ;
    }

    // Handles validation for @RequestBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));

        return new ResponseEntity<>("Validation error: " + message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ApiResponse<Integer>> handleConflictException(ConflictException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ApiResponse.error(e.getMessage()));
    }
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ApiResponse<Void>> handleConflictException(Exception e) {
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.error(e.getMessage()));
//    }







}
