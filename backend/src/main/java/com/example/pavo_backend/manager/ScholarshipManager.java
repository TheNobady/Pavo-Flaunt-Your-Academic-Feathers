package com.example.pavo_backend.manager;

import com.example.pavo_backend.dao.ScholarshipDao;
import com.example.pavo_backend.model.Scholarship;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ScholarshipManager {
    private final ScholarshipDao dao;

    public ScholarshipManager(ScholarshipDao dao) {
        this.dao = dao;
    }

    public List<Scholarship> getAll() {
        return dao.findAll();
    }

    public Optional<Scholarship> getById(String id) {
        return dao.findById(id);
    }
}
