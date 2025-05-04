package com.alabenhajsaad.api.core.datasource_config.liquibase;

import com.alabenhajsaad.api.core.datasource_config.multitenant.DynamicRoutingDataSource;
import com.alabenhajsaad.api.core.datasource_config.multitenant.TenantContext;
import liquibase.Contexts;
import liquibase.LabelExpression;
import liquibase.Liquibase;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.resource.ClassLoaderResourceAccessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Connection;

@Service
@Slf4j
@RequiredArgsConstructor
public class LiquibaseRunnerService {

    private final DynamicRoutingDataSource dynamicRoutingDataSource;

    public void runLiquibaseForTenant(String tenantId) {
        try {
            TenantContext.setCurrentTenant(tenantId);

            try (Connection connection = dynamicRoutingDataSource.getConnection()) {
                Database database = DatabaseFactory.getInstance()
                        .findCorrectDatabaseImplementation(new JdbcConnection(connection));

                try (Liquibase liquibase = new Liquibase(
                        "db/changelog/multiTenant/db.changelog-main.yaml",
                        new ClassLoaderResourceAccessor(),
                        database)) {

                    liquibase.update(new Contexts(tenantId), new LabelExpression());
                    log.info("Liquibase completed for tenant: {}", tenantId);
                }
            }
        } catch (Exception e) {
            log.error("Error running Liquibase for tenant: {}", tenantId, e);
        } finally {
            TenantContext.clear();
        }
    }
}

