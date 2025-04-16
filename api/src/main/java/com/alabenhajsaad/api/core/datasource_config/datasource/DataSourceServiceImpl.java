package com.alabenhajsaad.api.core.datasource_config.datasource;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DataSourceServiceImpl implements DataSourceService {
    private final DataSourceRepository repository ;

    @Override
    public DataSourceEntity addDataSource(String tenantId ,String databaseUrl) {

        return repository.save(DataSourceEntity.builder()
                            .url(databaseUrl)
                            .tenantId(tenantId)
                            .build());
    }

    @Override
    public List<DataSourceEntity> getAllDataSources() {
        return repository.findAll();
    }
}
