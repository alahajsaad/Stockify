package com.alabenhajsaad.api.datasourceconfig.correct;

import com.alabenhajsaad.api.datasourceconfig.datasource.DataSourceEntity;
import com.alabenhajsaad.api.datasourceconfig.datasource.DataSourceService;
import com.alabenhajsaad.api.datasourceconfig.multitenant.DynamicRoutingDataSource;
import com.zaxxer.hikari.HikariDataSource;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class DynamicDataSourceService {
    @Value("${database.default.username}")
    private String defaultUsername;

    @Value("${database.default.password}")
    private String defaultPassword;
    private final DynamicRoutingDataSource dynamicDataSource;
    private final DataSourceService dataSourceService;

    @PostConstruct
    public void reInitializeDynamicDataSourceMapOnStartup() {
        try {
            List<DataSourceEntity> dataSourceEntities = dataSourceService.getAllDataSources();

            if (dynamicDataSource.isEmptyDataSources()) {
                for (DataSourceEntity dataSourceEntity : dataSourceEntities) {
                    dynamicDataSource.addDataSource(dataSourceEntity.getTenantId(), createDataSource(dataSourceEntity.getUrl()));
                }
            }
        } catch (Exception e) {
            log.error("Error initializing dynamic data sources: {}", e.getMessage(), e);
        }
    }

    public void registerTenant(String tenantId, String url) {
        if (!dynamicDataSource.containsDataSource(tenantId)) {
            DataSource newDataSource = createDataSource(url);
            dynamicDataSource.addDataSource(tenantId, newDataSource);
        }
    }

    private DataSource createDataSource(String url) {
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

