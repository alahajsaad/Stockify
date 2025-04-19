package com.alabenhajsaad.api.core.datasource_config.liquibase;


//import com.alabenhajsaad.api.core.datasource_config.datasource.DataSourceEntity;
//import com.alabenhajsaad.api.core.datasource_config.liquibase.LiquibaseService;
//import com.alabenhajsaad.api.core.datasource_config.multitenant.DynamicRoutingDataSource;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.stereotype.Service;
//
//import javax.sql.DataSource;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class TenantManagementService {
//
//    private final DynamicRoutingDataSource dynamicRoutingDataSource;
//    private final LiquibaseService liquibaseService;
//
//    @Value("${spring.datasource.multitenant.driver-class-name}")
//    private String driverClassName;
//
//    public void registerNewTenant(String tenantId, String jdbcUrl, String username, String password) {
//        log.info("Registering new tenant: {}", tenantId);
//
//        // 1. Create the DataSource for the new tenant
//        DataSource tenantDataSource = DataSourceBuilder.create()
//                .url(jdbcUrl)
//                .username(username)
//                .password(password)
//                .driverClassName(driverClassName)
//                .build();
//
//        // 2. Add it to the DynamicRoutingDataSource
//        dynamicRoutingDataSource.addDataSource(tenantId, tenantDataSource);
//
//        // 3. Run Liquibase migrations for this new tenant
//        liquibaseService.runLiquibaseForTenant(tenantId);
//
//        log.info("Successfully registered tenant: {}", tenantId);
//    }
//}
