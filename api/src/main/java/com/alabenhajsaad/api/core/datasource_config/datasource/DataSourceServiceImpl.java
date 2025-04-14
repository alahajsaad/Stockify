package com.alabenhajsaad.api.core.datasource_config.datasource;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DataSourceServiceImpl implements DataSourceService {
    private final DataSourceRepository repository ;

    @Override
    public DataSourceEntity addDataSource(DataSourceEntity dataSource) {
        return repository.save(dataSource);
    }

    @Override
    public List<DataSourceEntity> getAllDataSources() {
        return repository.findAll();
    }
}
