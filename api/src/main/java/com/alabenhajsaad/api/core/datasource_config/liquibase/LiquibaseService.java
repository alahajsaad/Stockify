//package com.alabenhajsaad.api.core.datasource_config.liquibase;
//
//import com.alabenhajsaad.api.core.datasource_config.multitenant.DynamicRoutingDataSource;
//import com.alabenhajsaad.api.core.datasource_config.multitenant.TenantContext;
//import liquibase.Contexts;
//import liquibase.LabelExpression;
//import liquibase.Liquibase;
//import liquibase.database.Database;
//import liquibase.database.DatabaseFactory;
//import liquibase.database.jvm.JdbcConnection;
//import liquibase.resource.ClassLoaderResourceAccessor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.sql.Connection;

//@Slf4j
//@Service
//public class LiquibaseService {
//
//    private final DynamicRoutingDataSource dynamicRoutingDataSource;
//
//    @Value("${spring.liquibase.change-log:classpath:db/changelog/db.changelog-master.xml}")
//    private String changeLogFile;
//
//    @Value("${spring.liquibase.enabled:true}")
//    private boolean liquibaseEnabled;
//
//    public LiquibaseService(DynamicRoutingDataSource dynamicRoutingDataSource) {
//        this.dynamicRoutingDataSource = dynamicRoutingDataSource;
//    }
//
//    public void runLiquibaseForTenant(String tenantId) {
//        if (!liquibaseEnabled) {
//            log.info("Liquibase is disabled. Skipping database migrations for tenant: {}", tenantId);
//            return;
//        }
//
//        try {
//            log.info("Running Liquibase for tenant: {}", tenantId);
//
//            // Set the tenant context
//            TenantContext.setCurrentTenant(tenantId);
//
//            // Get connection and run Liquibase
//            try (Connection connection = dynamicRoutingDataSource.getConnection()) {
//                Database database = DatabaseFactory.getInstance()
//                        .findCorrectDatabaseImplementation(new JdbcConnection(connection));
//
//                try (Liquibase liquibase = new Liquibase(
//                        changeLogFile,
//                        new ClassLoaderResourceAccessor(),
//                        database)) {
//
//                    // Run with tenant-specific context
//                    liquibase.update(new Contexts(tenantId), new LabelExpression());
//                }
//            }
//
//            log.info("Liquibase completed for tenant: {}", tenantId);
//        } catch (Exception e) {
//            log.error("Error running Liquibase for tenant: {}", tenantId, e);
//            throw new RuntimeException("Failed to initialize database for tenant: " + tenantId, e);
//        } finally {
//            // Clear tenant context
//            TenantContext.clear();
//        }
//    }
//}