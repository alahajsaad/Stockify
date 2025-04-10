package com.alabenhajsaad.api.core.datasourceconfig.datasource;

import java.util.List;

public interface DataSourceService {
    DataSourceEntity addDataSource(DataSourceEntity dataSource);
    List<DataSourceEntity> getAllDataSources();
}
