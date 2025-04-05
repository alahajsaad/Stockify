package com.alabenhajsaad.api.datasourceconfig.multitenant;

import com.alabenhajsaad.api.security.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class TenantFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private static final List<String> WITHOUT_JWT_AUTH_PATHS = Arrays.asList(
            "/api/v1/user/admin",
            "/api/v1/company",
            "/api/v1/auth/login",
            "/api/v1/auth/profile",
            "/api/v1/datasource",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui/index.html#"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String requestUri = request.getRequestURI();
            log.info("Request URI: {}", requestUri);
            // Vérification si le chemin est dans la liste des chemins ignorés
            if (WITHOUT_JWT_AUTH_PATHS.stream().anyMatch(requestUri::startsWith)) {
                filterChain.doFilter(request, response);
                return; // Retourner pour éviter l'exécution du reste du filtre
            }

            String authHeader = request.getHeader("Authorization");

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);

                // Vérification et récupération du tenantId
                String tenantId = jwtService.getTenantIdFromToken(token);

                log.info("Tenant ID: {}", tenantId);
                if (tenantId != null) {
                    TenantContext.setCurrentTenant(tenantId);
                } else {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Unauthorized: Invalid token");
                    return;
                }
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Unauthorized: Missing or invalid Authorization header");
                return;
            }

            filterChain.doFilter(request, response);
        } finally {
            // Toujours nettoyer le ThreadLocal après la requête
            TenantContext.clear();
        }
    }
}
