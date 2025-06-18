package com.alabenhajsaad.api.core.datasource_config.liquibase;

import com.alabenhajsaad.api.core.datasource_config.datasource.DataSourceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;


@Configuration
@Slf4j
public class LiquibaseMultiTenantConfig {
    private final DataSourceService dataSourceService;
    private final LiquibaseRunnerService liquibaseRunnerService;
    public LiquibaseMultiTenantConfig(
            DataSourceService dataSourceService,LiquibaseRunnerService liquibaseRunnerService) {
        this.dataSourceService = dataSourceService;
        this.liquibaseRunnerService = liquibaseRunnerService;
    }

    // Run Liquibase for multi-tenant datasources after beans are initialized
//    @Bean
//    @DependsOn("multiTenantDataSource")
//    public CommandLineRunner tenantLiquibaseRunner() {
//        return args -> {
//            // Run liquibase for default tenant first
//            liquibaseRunnerService.runLiquibaseForTenant("default");
//
//            // Get all tenants and run liquibase for each one
//            List<DataSourceEntity> dataSources = dataSourceService.getAllDataSources();
//            for (DataSourceEntity dataSourceEntity : dataSources) {
//                String tenantId = dataSourceEntity.getTenantId();
//                liquibaseRunnerService.runLiquibaseForTenant(tenantId);
//            }
//        };
//    }



}
