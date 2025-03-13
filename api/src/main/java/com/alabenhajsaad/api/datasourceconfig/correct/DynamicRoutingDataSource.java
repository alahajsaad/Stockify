package com.alabenhajsaad.api.datasourceconfig.correct;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import javax.sql.DataSource;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


public class DynamicRoutingDataSource extends AbstractRoutingDataSource {
    private final Map<Object, Object> dataSources = new ConcurrentHashMap<>();

    public void addDataSource(String tenantId, DataSource dataSource) {
        dataSources.put(tenantId, dataSource); // Register the new tenant's data source
        super.setTargetDataSources(dataSources); // Update Spring's routing map
        super.afterPropertiesSet(); // Refresh the routing configuration
    }

    public boolean containsDataSource(String tenantId) {
        return dataSources.containsKey(tenantId);
    }

    @Override
    protected Object determineCurrentLookupKey() {
        return TenantContext.getCurrentTenant(); // Dynamic tenant switching
    }
}

