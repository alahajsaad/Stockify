//package com.alabenhajsaad.api.core.datasource_config.liquibase;
//
//import com.alabenhajsaad.api.core.datasource_config.multitenant.DynamicRoutingDataSource;
//import com.alabenhajsaad.api.core.datasource_config.multitenant.TenantContext;
//import liquibase.Contexts;
//import liquibase.LabelExpression;
//import liquibase.Liquibase;
//import liquibase.database.Database;
//import liquibase.database.DatabaseFactory;
//import liquibase.database.jvm.JdbcConnection;
//import liquibase.resource.ClassLoaderResourceAccessor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//import java.sql.Connection;
//
//@Slf4j
//@Service
//public class LiquibaseService {
//
//
//    @Value("${spring.liquibase.change-log:classpath:db/changelog/db.changelog-master.xml}")
//    private String changeLogFile;
//
//    @Value("${spring.liquibase.enabled:true}")
//    private boolean liquibaseEnabled;
//
//
//
//    public void runLiquibaseForTenant(String tenantId) {
//
//    }
//}