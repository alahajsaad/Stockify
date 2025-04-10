package com.alabenhajsaad.api.core.datasourceconfig.multitenant;

import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j

public class DynamicRoutingDataSource extends AbstractRoutingDataSource {

    private final Map<Object, Object> dataSources = new ConcurrentHashMap<>();
    private String defaultTenant = "default";

    public DynamicRoutingDataSource() {

        // Initialisation avec au moins une source de données vide pour éviter l'erreur
        super.setTargetDataSources(new HashMap<>());
        super.afterPropertiesSet();

    }




    public void addDataSource(String tenantId, DataSource dataSource) {
        log.info("dataSource: "+ dataSource.toString());
        dataSources.put(tenantId, dataSource); // Register the new tenant's data source
        super.setTargetDataSources(dataSources); // Update Spring's routing map
        super.afterPropertiesSet(); // Refresh the routing configuration
    }

    public boolean containsDataSource(String tenantId) {

        return dataSources.containsKey(tenantId);
    }
    public boolean isEmptyDataSources(){
        return dataSources.isEmpty();
    }

    @Override
    protected Object determineCurrentLookupKey() {
        String currentTenant = TenantContext.getCurrentTenant();
        log.info("Current tenant is {}", currentTenant);
        if (currentTenant == null || !dataSources.containsKey(currentTenant)) {
            return defaultTenant; // Retourne le tenant par défaut au lieu de null
        }
        log.info("Current tenant datasource is {}", dataSources.get(currentTenant));
        return currentTenant;
    }


}

