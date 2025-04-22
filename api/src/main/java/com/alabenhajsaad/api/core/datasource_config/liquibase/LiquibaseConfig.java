//package com.alabenhajsaad.api.core.datasource_config.liquibase;
//
//import com.alabenhajsaad.api.core.datasource_config.datasource.DataSourceEntity;
//import com.alabenhajsaad.api.core.datasource_config.datasource.DataSourceService;
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
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.DependsOn;
//import org.springframework.core.io.ClassPathResource;
//
//import java.sql.Connection;
//import java.util.List;
//
//@Slf4j
//@Configuration
//public class LiquibaseConfig {
//
//    private final DataSourceService dataSourceService;
//    private final DynamicRoutingDataSource dynamicRoutingDataSource;
//
//    @Value("${spring.liquibase.tenant.change-log}")
//    private String tenantChangeLogFile;
//
//    @Value("${spring.liquibase.tenant.enabled:true}")
//    private boolean liquibaseEnabled;
//
//    public LiquibaseConfig(
//            DataSourceService dataSourceService,
//            @Qualifier("multiTenantDataSource") DynamicRoutingDataSource dynamicRoutingDataSource) {
//        this.dataSourceService = dataSourceService;
//        this.dynamicRoutingDataSource = dynamicRoutingDataSource;
//    }
//
//    // Run Liquibase for multi-tenant datasources after beans are initialized
//    @Bean
//    @DependsOn("multiTenantDataSource")
//    public CommandLineRunner tenantLiquibaseRunner() {
//        return args -> {
//            if (!liquibaseEnabled) {
//                log.info("Liquibase is disabled. Skipping tenant database migrations.");
//                return;
//            }
//
//            // Run liquibase for default tenant first
//            runLiquibaseForTenant("default");
//
//            // Get all tenants and run liquibase for each one
//            List<DataSourceEntity> dataSources = dataSourceService.getAllDataSources();
//            for (DataSourceEntity dataSourceEntity : dataSources) {
//                String tenantId = dataSourceEntity.getTenantId();
//                runLiquibaseForTenant(tenantId);
//            }
//        };
//    }
//
//    private void runLiquibaseForTenant(String tenantId) {
//        try {
//            log.info("Running Liquibase for tenant: {}", tenantId);
//
//            // Set the tenant context so the DynamicRoutingDataSource selects the right datasource
//            TenantContext.setCurrentTenant(tenantId);
//
//            // Get a connection from the data source
//            Connection connection = dynamicRoutingDataSource.getConnection();
//            Database database = DatabaseFactory.getInstance()
//                    .findCorrectDatabaseImplementation(new JdbcConnection(connection));
//            log.info("Loading Liquibase changelog from: {}", tenantChangeLogFile);
//            log.info("Changelog path: {}", new ClassPathResource(
//                    tenantChangeLogFile.replace("classpath:", "")).getFile().getAbsolutePath());
//            // Run Liquibase
//            try (Liquibase liquibase = new Liquibase(
//
//                    tenantChangeLogFile,
//                    new ClassLoaderResourceAccessor(),
//                    database)) {
//
//                // You can add tenant-specific contexts if needed
//                liquibase.update(new Contexts(tenantId), new LabelExpression());
//            }
//
//            log.info("Liquibase completed for tenant: {}", tenantId);
//        } catch (Exception e) {
//            log.error("Error running Liquibase for tenant: {}", tenantId, e);
//        } finally {
//            // Clear tenant context
//            TenantContext.clear();
//        }
//    }
//}