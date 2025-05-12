package com.alabenhajsaad.api.core.security.reset_token;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.time.Duration;

@Service
public class ResetTokenCacheService {

    private static final Duration EXPIRATION = Duration.ofMinutes(15);
    private static final String KEY_PREFIX = "reset_token:";

    private final RedisTemplate<String, ResetTokenPayload> redisTemplate;

    @Autowired
    public ResetTokenCacheService(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, ResetTokenPayload> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        // Configure ObjectMapper to support Java time types
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        objectMapper.activateDefaultTyping(objectMapper.getPolymorphicTypeValidator(),
                ObjectMapper.DefaultTyping.NON_FINAL);

        // Use Jackson2JsonRedisSerializer with specific type information
        Jackson2JsonRedisSerializer<ResetTokenPayload> serializer =
                new Jackson2JsonRedisSerializer<>(ResetTokenPayload.class);
        serializer.setObjectMapper(objectMapper);

        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(serializer);
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(serializer);
        template.afterPropertiesSet();

        this.redisTemplate = template;
    }

    /**
     * Cache a reset token with its payload
     * @param rawToken the token to cache (must not be null)
     * @param payload the payload to associate with the token (must not be null)
     * @throws IllegalArgumentException if rawToken or payload is null
     */
    public void cacheToken(String rawToken, ResetTokenPayload payload) {
        Assert.notNull(rawToken, "Reset token cannot be null");
        Assert.notNull(payload, "Reset token payload cannot be null");

        String key = generateKey(rawToken);
        redisTemplate.opsForValue().set(key, payload, EXPIRATION);
    }

    /**
     * Retrieve a token's payload from cache
     * @param rawToken the token to retrieve (must not be null)
     * @return the associated payload or null if not found
     * @throws IllegalArgumentException if rawToken is null
     */
    public ResetTokenPayload getToken(String rawToken) {
        Assert.notNull(rawToken, "Reset token cannot be null");

        String key = generateKey(rawToken);
        return redisTemplate.opsForValue().get(key);
    }

    /**
     * Delete a token from cache
     * @param rawToken the token to delete (must not be null)
     * @throws IllegalArgumentException if rawToken is null
     */
    public void deleteToken(String rawToken) {
        Assert.notNull(rawToken, "Reset token cannot be null");

        String key = generateKey(rawToken);
        redisTemplate.delete(key);
    }

    /**
     * Generate a Redis key with prefix for the token
     * @param rawToken the token
     * @return the prefixed key for Redis
     */
    private String generateKey(String rawToken) {
        return KEY_PREFIX + rawToken;
    }
}