package com.alabenhajsaad.api.datasourceconfig.databaseinitializer;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import org.hibernate.cfg.Configuration;

import java.util.Set;

public class DatabaseInitializer {

    public static void initializeDatabase(String packageName,String tenantId) {
        // Scanner les entités dans le package donné
        Set<Class<?>> entities = EntityScanner.getEntities(packageName);

        // Configuration de Hibernate
        Configuration config = new Configuration();

        // Ajouter chaque entité trouvée à Hibernate
        for (Class<?> entity : entities) {
            config.addAnnotatedClass(entity);
        }

        // Définir les paramètres de connexion
        config.setProperty("hibernate.connection.driver_class", "org.postgresql.Driver");
        config.setProperty("hibernate.connection.url", "jdbc:postgresql://localhost:5432/stockify_"+tenantId);
        config.setProperty("hibernate.connection.username", "username");
        config.setProperty("hibernate.connection.password", "password");
        config.setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        config.setProperty("hibernate.hbm2ddl.auto", "update");
        config.setProperty("hibernate.show_sql", "true");

        // Créer l’EntityManagerFactory
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("myPersistenceUnit");

        System.out.println("Base de données initialisée avec les entités : " + entities);
    }
}

