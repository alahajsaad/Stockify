package com.alabenhajsaad.api.datasourceconfig;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;

//@Configuration
//@EnableJpaRepositories(
//        basePackages = "com.alabenhajsaad.api.product",
//        entityManagerFactoryRef = "tenantEntityManagerFactory",
//        transactionManagerRef = "tenantTransactionManager"
//)
//@RequiredArgsConstructor
//public class TenantDataSourceConfig {
//
//    private final PrimaryDataSourceConfig primaryDataSourceConfig;
//    @Bean(name = "tenantDataSource")
//    public AbstractRoutingDataSource dataSource() {
//        AbstractRoutingDataSource routingDataSource = new AbstractRoutingDataSource() {
//            @Override
//            protected Object determineCurrentLookupKey() {
//                return TenantContext.getTenantId();
//            }
//        };
//
//        // Set a default datasource (could be your main DB)
//        routingDataSource.setDefaultTargetDataSource(primaryDataSourceConfig.primaryDataSource());
//
//        // The actual datasources will be resolved at runtime
//        routingDataSource.setTargetDataSources(new HashMap<>());
//
//        return routingDataSource;
//    }
//
//    @Bean(name = "tenantEntityManagerFactory")
//    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
//            EntityManagerFactoryBuilder builder,
//            @Qualifier("tenantDataSource") DataSource dataSource) {
//
//        HashMap<String, Object> properties = new HashMap<>();
//        properties.put("hibernate.hbm2ddl.auto", "update");
//        properties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
//        properties.put("hibernate.multiTenancy", "DATABASE");
//
//        return builder
//                .dataSource(dataSource)
//                .packages("com.alabenhajsaad.api.product")
//                .persistenceUnit("tenant")
//                .properties(properties)
//                .build();
//    }
//
//    @Bean(name = "tenantTransactionManager")
//    public PlatformTransactionManager transactionManager(
//            @Qualifier("tenantEntityManagerFactory") LocalContainerEntityManagerFactoryBean entityManagerFactory) {
//        return new JpaTransactionManager(entityManagerFactory.getObject());
//    }
//}
