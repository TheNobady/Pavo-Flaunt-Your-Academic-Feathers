package com.example.pavo_backend.controller;

import com.example.pavo_backend.manager.ScholarshipManager;
import com.example.pavo_backend.model.Scholarship;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/scholarships")
@CrossOrigin(origins = "*") // Allow nextjs to fetch
public class ScholarshipController {
    private final ScholarshipManager manager;

    public ScholarshipController(ScholarshipManager manager) {
        this.manager = manager;
    }

    @GetMapping
    public List<Scholarship> getAll() {
        return manager.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Scholarship> getById(@PathVariable String id) {
        return manager.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
