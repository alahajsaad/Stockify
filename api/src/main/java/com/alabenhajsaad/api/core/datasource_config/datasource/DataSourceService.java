package com.alabenhajsaad.api.core.datasource_config.datasource;

import java.util.List;

public interface DataSourceService {
    DataSourceEntity addDataSource(DataSourceEntity dataSource);
    List<DataSourceEntity> getAllDataSources();
}
