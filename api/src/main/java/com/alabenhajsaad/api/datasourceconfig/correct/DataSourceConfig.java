package com.alabenhajsaad.api.datasourceconfig.correct;

import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;


import javax.sql.DataSource;

@Configuration
@EnableJpaRepositories(
        basePackages = "com.alabenhajsaad.api.product",
        entityManagerFactoryRef = "entityManagerFactory",
        transactionManagerRef = "transactionManager"
)
@RequiredArgsConstructor
public class DataSourceConfig {




    @Primary
    @Bean(name = "multiTenantDataSource")
    public DynamicRoutingDataSource dynamicRoutingDataSource() {
        return new DynamicRoutingDataSource();
    }



    @Bean(name = "entityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            EntityManagerFactoryBuilder builder,@Qualifier("multiTenantDataSource") DataSource dataSource) {
        return builder
                .dataSource(dataSource)
                .packages("com.alabenhajsaad.api.product")
                .persistenceUnit("default")
                .build();
    }

    @Bean(name = "transactionManager")
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}

