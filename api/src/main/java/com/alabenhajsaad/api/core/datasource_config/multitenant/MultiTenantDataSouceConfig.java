package com.alabenhajsaad.api.core.datasource_config.multitenant;

import com.alabenhajsaad.api.core.datasource_config.datasource.DataSourceEntity;
import com.alabenhajsaad.api.core.datasource_config.datasource.DataSourceService;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;


import javax.sql.DataSource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages ={"com.alabenhajsaad.api.business"} ,
        entityManagerFactoryRef = "multiTenantEntityManagerFactory",  // Changed name
        transactionManagerRef = "multiTenantTransactionManager"
)

public class MultiTenantDataSouceConfig {
    private final DataSourceService dataSourceService;
    public MultiTenantDataSouceConfig(DataSourceService dataSourceService ) {
        this.dataSourceService = dataSourceService;

    }


    @Bean(name = "multiTenantDataSource")
    public DynamicRoutingDataSource dynamicRoutingDataSource(
            @Value("${spring.datasource.multitenant.jdbc-url}") String jdbcUrl,
            @Value("${spring.datasource.multitenant.username}") String username,
            @Value("${spring.datasource.multitenant.password}") String password,
            @Value("${spring.datasource.multitenant.driver-class-name}") String driverClassName) {

        // create a dynamic routing data source
        DynamicRoutingDataSource dynamicRoutingDataSource = new DynamicRoutingDataSource();

        // load all existing data sources
        List<DataSourceEntity> dataSourceEntities = dataSourceService.getAllDataSources();

        // add all existing data sources to the dynamicRoutingDataSource object
        for (DataSourceEntity dataSourceEntity : dataSourceEntities) {
            DataSource tenantDataSource = createDataSource(dataSourceEntity.getUrl(),username,password,driverClassName);
            dynamicRoutingDataSource.addDataSource(dataSourceEntity.getTenantId(), tenantDataSource);
        }

        // Création d'un DataSource par défaut avec les valeurs de l'application.yml
        DataSource defaultDataSource =  createDataSource(jdbcUrl,username,password,driverClassName);
        dynamicRoutingDataSource.addDataSource("default", defaultDataSource);

        return dynamicRoutingDataSource;
    }
    public DataSource createDataSource(String url, String username, String password, String driverClassName) {
        return DataSourceBuilder.create()
                .url(url)
                .username(username)
                .password(password)
                .driverClassName(driverClassName)
                .build();
    }



    @Bean(name = "multiTenantEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean tenantEntityManagerFactory(
            @Qualifier("multiTenantDataSource") DataSource dataSource){
        LocalContainerEntityManagerFactoryBean bean = new LocalContainerEntityManagerFactoryBean();
        bean.setDataSource(dataSource);
        bean.setPackagesToScan("com.alabenhajsaad.api.business");

        JpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        bean.setJpaVendorAdapter(adapter);

        Map<String,String> props = new HashMap<>();
        props.put("hibernate.dialect","org.hibernate.dialect.MySQLDialect");
        props.put("hibernate.show_sql","true");
        props.put("hibernate.format_sql","true");
        props.put("hibernate.hbm2ddl.auto","none");
        bean.setJpaPropertyMap(props);

        return bean;
    }

    @Bean(name = "multiTenantTransactionManager")
    public PlatformTransactionManager tenantTransactionManager(
            @Qualifier("multiTenantEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }


}

