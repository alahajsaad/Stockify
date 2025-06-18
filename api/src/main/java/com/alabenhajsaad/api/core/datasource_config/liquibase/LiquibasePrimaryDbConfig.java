package com.alabenhajsaad.api.core.datasource_config.liquibase;

import jakarta.annotation.PostConstruct;
import liquibase.Liquibase;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.resource.ClassLoaderResourceAccessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.sql.Connection;

//@Configuration
//public class LiquibasePrimaryDbConfig {
//    @Autowired
//    @Qualifier("primaryDataSource")
//    private DataSource mainDataSource;
//
//    @PostConstruct
//    public void runLiquibase() {
//        runLiquibase(mainDataSource);
//    }
//
//    private void runLiquibase(DataSource dataSource) {
//        try (Connection connection = dataSource.getConnection()) {
//            Database database = DatabaseFactory.getInstance()
//                    .findCorrectDatabaseImplementation(new JdbcConnection(connection));
//
//            Liquibase liquibase = new Liquibase(
//                    "db/changelog/primary/db.changelog-main.yaml",
//                    new ClassLoaderResourceAccessor(),
//                    database
//            );
//
//            liquibase.update(); // or liquibase.update("context") if needed
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to run Liquibase for changelog: " + "db/changelog/primary/db.changelog-main.xml", e);
//        }
//    }
//}
