package com.example.pavo_backend.controller;

import com.example.pavo_backend.manager.CollegeManager;
import com.example.pavo_backend.model.College;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/colleges")
@CrossOrigin(origins = "*") // Allow nextjs to fetch
public class CollegeController {
    private final CollegeManager manager;

    public CollegeController(CollegeManager manager) {
        this.manager = manager;
    }

    @GetMapping
    public List<College> getAll() {
        return manager.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<College> getById(@PathVariable String id) {
        return manager.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
