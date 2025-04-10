package com.alabenhajsaad.api.core.datasourceconfig.multitenant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterWebConfig {

    private final TenantFilter tenantFilter;

    @Autowired
    public FilterWebConfig(TenantFilter tenantFilter) {
        this.tenantFilter = tenantFilter;
    }

    @Bean
    public FilterRegistrationBean<TenantFilter> tenantFilterRegistration() {
        FilterRegistrationBean<TenantFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(tenantFilter); // Utiliser l'instance injectée
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(1);
        return registrationBean;
    }
}
