package com.alabenhajsaad.api.core.datasource_config.multitenant;

import com.alabenhajsaad.api.core.datasource_config.liquibase.LiquibaseRunnerService;
import com.zaxxer.hikari.HikariDataSource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;

@RequiredArgsConstructor
@Service
@Slf4j
public class DynamicDataSourceService {
    @Value("${database.default.username}")
    private String defaultUsername;

    @Value("${database.default.pass}")
    private String defaultPassword;
    private final DynamicRoutingDataSource dynamicDataSource;
    private final LiquibaseRunnerService liquibaseRunnerService;

    public void registerTenant(String tenantId, String url) {
        if (!dynamicDataSource.containsDataSource(tenantId)) {
            DataSource newDataSource = createDataSource(url,"root","","com.mysql.cj.jdbc.Driver");
            dynamicDataSource.addDataSource(tenantId, newDataSource);
            liquibaseRunnerService.runLiquibaseForTenant(tenantId);
        }
    }

    // Méthode pour créer un DataSource
    public DataSource createDataSource(String url, String username, String password, String driverClassName) {
        return DataSourceBuilder.create()
                .url(url)
                .username(username)
                .password(password)
                .driverClassName(driverClassName)
                .build();
    }
    public DataSource createDataSource(String url) {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(url);
        dataSource.setUsername(defaultUsername);
        dataSource.setPassword(defaultPassword);
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver"); // Change this if needed
        dataSource.setMaximumPoolSize(10);
        dataSource.setMinimumIdle(2);
        return dataSource;
    }

}

