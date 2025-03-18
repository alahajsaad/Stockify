package com.alabenhajsaad.api.datasourceconfig.datasource;

import java.util.List;

public interface DataSourceService {
    DataSourceEntity addDataSource(DataSourceEntity dataSource);
    List<DataSourceEntity> getAllDataSources();
}
