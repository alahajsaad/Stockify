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

import java.time.Duration;

@Service
public class ResetTokenCacheService {

    private static final Duration EXPIRATION = Duration.ofMinutes(15);

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

    public void cacheToken(String rawToken, ResetTokenPayload payload) {
        redisTemplate.opsForValue().set(rawToken, payload, EXPIRATION);
    }

    public ResetTokenPayload getToken(String rawToken) {
        return redisTemplate.opsForValue().get(rawToken);
    }

    public void deleteToken(String rawToken) {
        redisTemplate.delete(rawToken);
    }
}