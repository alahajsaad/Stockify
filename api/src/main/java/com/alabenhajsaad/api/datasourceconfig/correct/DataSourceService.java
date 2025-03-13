package com.alabenhajsaad.api.datasourceconfig.correct;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import javax.sql.DataSource;
@RequiredArgsConstructor
public class DataSourceService {

    private final DynamicRoutingDataSource dynamicDataSource;


    public void registerTenant(String tenantId, String url, String username, String password) {
        if (!dynamicDataSource.containsDataSource(tenantId)) {
            DataSource newDataSource = createDataSource(url, username, password);
            dynamicDataSource.addDataSource(tenantId, newDataSource);
        }
    }

    private DataSource createDataSource(String url, String username, String password) {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setDriverClassName("org.postgresql.Driver"); // Change based on your DB
        return dataSource;
    }
}

