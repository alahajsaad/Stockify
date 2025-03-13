package com.alabenhajsaad.api.datasourceconfig.databaseinitializer;


import jakarta.persistence.Entity;
import org.reflections.Reflections;

import java.util.Set;

public class EntityScanner {


    public static Set<Class<?>> getEntities(String packageName) {
        Reflections reflections = new Reflections(packageName);
        return reflections.getTypesAnnotatedWith(Entity.class);
    }
}

