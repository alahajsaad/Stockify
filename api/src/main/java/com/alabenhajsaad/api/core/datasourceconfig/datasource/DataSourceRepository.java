package com.alabenhajsaad.api.core.datasourceconfig.datasource;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DataSourceRepository extends JpaRepository<DataSourceEntity, Integer> {
}
