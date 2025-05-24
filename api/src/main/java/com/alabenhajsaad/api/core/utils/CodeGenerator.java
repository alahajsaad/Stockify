package com.alabenhajsaad.api.core.utils;


import java.nio.ByteBuffer;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.UUID;

public class CodeGenerator {
    private CodeGenerator(){}

    private static final String CHARACTERS = "0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generate(int length) {
        StringBuilder codeBuilder = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(CHARACTERS.length());
            codeBuilder.append(CHARACTERS.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

    public static String generateBase64TenantId() {
        UUID uuid = UUID.randomUUID();
        ByteBuffer byteBuffer = ByteBuffer.allocate(16);
        byteBuffer.putLong(uuid.getMostSignificantBits());
        byteBuffer.putLong(uuid.getLeastSignificantBits());

        // Encode to Base64 URL-safe and remove trailing '=' padding
        return Base64.getUrlEncoder().withoutPadding().encodeToString(byteBuffer.array());
    }
}
