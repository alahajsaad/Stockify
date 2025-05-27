package com.alabenhajsaad.api.business.audit_log;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuditLogServiceImpl implements AuditLogService{

    private final AuditLogRepository repository;

    public void log(String username, String action, String details) {
        AuditLog log = new AuditLog();
        log.setUsername(username);
        log.setAction(action);
        log.setDetails(details);
        log.setTimestamp(LocalDateTime.now());
        repository.save(log);
    }
}

