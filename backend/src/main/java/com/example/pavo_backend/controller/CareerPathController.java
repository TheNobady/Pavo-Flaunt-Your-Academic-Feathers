package com.example.pavo_backend.controller;

import com.example.pavo_backend.manager.CareerPathManager;
import com.example.pavo_backend.model.CareerPath;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/career-paths")
@CrossOrigin(origins = "*") // Allow nextjs to fetch
public class CareerPathController {
    private final CareerPathManager manager;

    public CareerPathController(CareerPathManager manager) {
        this.manager = manager;
    }

    @GetMapping
    public List<CareerPath> getAll() {
        return manager.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CareerPath> getById(@PathVariable String id) {
        return manager.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
