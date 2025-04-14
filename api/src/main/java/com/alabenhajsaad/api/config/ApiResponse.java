package com.alabenhajsaad.api.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private String status;
    private T data;
    private String message;

    public ApiResponse(String status, T data) {
        this.status = status;
        this.data = data;
    }
    public ApiResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>("success", data, message);
    }

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>("success", data, null);
    }
    public static <T> ApiResponse<T> success(String message) {
        return new ApiResponse<>("success", null, message);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>("error", null, message);
    }
    public static <T> ApiResponse<T> error(String message , T data) {
        return new ApiResponse<>("error", data, message);
    }
}
