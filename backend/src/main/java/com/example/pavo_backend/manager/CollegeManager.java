package com.example.pavo_backend.manager;

import com.example.pavo_backend.dao.CollegeDao;
import com.example.pavo_backend.model.College;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CollegeManager {
    private final CollegeDao dao;

    public CollegeManager(CollegeDao dao) {
        this.dao = dao;
    }

    public List<College> getAll() {
        return dao.findAll();
    }

    public Optional<College> getById(String id) {
        return dao.findById(id);
    }
}
