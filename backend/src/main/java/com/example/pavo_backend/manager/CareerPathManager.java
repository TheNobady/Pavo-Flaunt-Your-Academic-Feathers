package com.example.pavo_backend.manager;

import com.example.pavo_backend.dao.CareerPathDao;
import com.example.pavo_backend.model.CareerPath;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CareerPathManager {
    private final CareerPathDao dao;

    public CareerPathManager(CareerPathDao dao) {
        this.dao = dao;
    }

    public List<CareerPath> getAll() {
        return dao.findAll();
    }

    public Optional<CareerPath> getById(String id) {
        return dao.findById(id);
    }
}
