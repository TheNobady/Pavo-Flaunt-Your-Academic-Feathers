package com.example.pavo_backend.dao;

import com.example.pavo_backend.model.Scholarship;
import com.example.pavo_backend.store.DataStore;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class ScholarshipDao {
    private final DataStore dataStore;

    public ScholarshipDao(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    public List<Scholarship> findAll() {
        return dataStore.getScholarships();
    }

    public Optional<Scholarship> findById(String id) {
        return dataStore.getScholarships().stream()
                .filter(e -> e.getId().equals(id))
                .findFirst();
    }
}
