package com.alabenhajsaad.api.core.utils;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class CodeGenerator {
    private static final String CHARACTERS = "0123456789";
    private final SecureRandom secureRandom = new SecureRandom();

    public String generate(int length) {
        StringBuilder codeBuilder = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(CHARACTERS.length());
            codeBuilder.append(CHARACTERS.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }
}
