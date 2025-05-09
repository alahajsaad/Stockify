package com.alabenhajsaad.api.core.datasource_config.datasource;

import java.util.List;

public interface DataSourceService {
    DataSourceEntity addDataSource(String tenantId ,String databaseUrl);
    List<DataSourceEntity> getAllDataSources();
}
