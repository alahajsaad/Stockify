package com.alabenhajsaad.api.datasourceconfig;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

//@Component
//@RequiredArgsConstructor
//public class TenantDataSourceFactory {
//
//    @Value("${spring.tenant.datasource.url-base}")
//    private String urlBase;
//
//    @Value("${spring.tenant.datasource.username}")
//    private String username;
//
//    @Value("${spring.tenant.datasource.password}")
//    private String password;
//
//    @Value("${spring.tenant.datasource.driver-class-name}")
//    private String driverClassName;
//
//    private final AbstractRoutingDataSource routingDataSource;
//
//    private final Map<String, DataSource> dataSources = new ConcurrentHashMap<>();
//
//    public DataSource getDataSource(String tenantId) {
//        return dataSources.computeIfAbsent(tenantId, this::createDataSource);
//    }
//
//    public synchronized void addDataSource(String tenantId, DataSource dataSource) {
//        dataSources.put(tenantId, dataSource);
//        updateRoutingDataSource();
//    }
//
//    private DataSource createDataSource(String tenantId) {
//        String url = urlBase + "/" + tenantId;
//
//        // Use HikariDataSource for better performance
//        return DataSourceBuilder.create()
//                .url(url)
//                .username(username)
//                .password(password)
//                .driverClassName(driverClassName)
//                .build();
//    }
//
//    private synchronized void updateRoutingDataSource() {
//        routingDataSource.setTargetDataSources(new ConcurrentHashMap<>(dataSources));
//        routingDataSource.afterPropertiesSet(); // Important to refresh
//    }
//}
