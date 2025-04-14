package com.alabenhajsaad.api.core.datasource_config.datasource;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DataSourceRepository extends JpaRepository<DataSourceEntity, Integer> {
}
