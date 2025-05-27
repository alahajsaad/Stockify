package com.alabenhajsaad.api.business.audit_log;

public interface AuditLogService {
    void log(String username, String action, String details);
}
