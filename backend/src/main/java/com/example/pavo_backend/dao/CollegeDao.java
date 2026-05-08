package com.example.pavo_backend.dao;

import com.example.pavo_backend.model.College;
import com.example.pavo_backend.store.DataStore;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class CollegeDao {
    private final DataStore dataStore;

    public CollegeDao(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    public List<College> findAll() {
        return dataStore.getColleges();
    }

    public Optional<College> findById(String id) {
        return dataStore.getColleges().stream()
                .filter(e -> e.getId().equals(id))
                .findFirst();
    }
}
