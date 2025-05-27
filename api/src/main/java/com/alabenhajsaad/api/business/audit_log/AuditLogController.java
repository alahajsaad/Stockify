package com.alabenhajsaad.api.business.audit_log;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/audit")
@RequiredArgsConstructor
public class AuditLogController {
    private final AuditLogService service;
}
