package com.example.pavo_backend.dao;

import com.example.pavo_backend.model.CareerPath;
import com.example.pavo_backend.store.DataStore;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class CareerPathDao {
    private final DataStore dataStore;

    public CareerPathDao(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    public List<CareerPath> findAll() {
        return dataStore.getCareerPaths();
    }

    public Optional<CareerPath> findById(String id) {
        return dataStore.getCareerPaths().stream()
                .filter(e -> e.getId().equals(id))
                .findFirst();
    }
}
