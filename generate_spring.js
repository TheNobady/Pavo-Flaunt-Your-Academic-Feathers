const fs = require('fs');

const entities = ['College', 'CareerPath', 'Scholarship'];

fs.mkdirSync('backend/src/main/java/com/example/pavo_backend/dao', { recursive: true });
fs.mkdirSync('backend/src/main/java/com/example/pavo_backend/manager', { recursive: true });
fs.mkdirSync('backend/src/main/java/com/example/pavo_backend/controller', { recursive: true });

entities.forEach(entity => {
    const varName = entity.charAt(0).toLowerCase() + entity.slice(1) + 's';

    // DAO
    const daoContent = `package com.example.pavo_backend.dao;

import com.example.pavo_backend.model.${entity};
import com.example.pavo_backend.store.DataStore;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class ${entity}Dao {
    private final DataStore dataStore;

    public ${entity}Dao(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    public List<${entity}> findAll() {
        return dataStore.get${entity}s();
    }

    public Optional<${entity}> findById(String id) {
        return dataStore.get${entity}s().stream()
                .filter(e -> e.getId().equals(id))
                .findFirst();
    }
}
`;
    fs.writeFileSync(`backend/src/main/java/com/example/pavo_backend/dao/${entity}Dao.java`, daoContent);

    // Manager
    const managerContent = `package com.example.pavo_backend.manager;

import com.example.pavo_backend.dao.${entity}Dao;
import com.example.pavo_backend.model.${entity};
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ${entity}Manager {
    private final ${entity}Dao dao;

    public ${entity}Manager(${entity}Dao dao) {
        this.dao = dao;
    }

    public List<${entity}> getAll() {
        return dao.findAll();
    }

    public Optional<${entity}> getById(String id) {
        return dao.findById(id);
    }
}
`;
    fs.writeFileSync(`backend/src/main/java/com/example/pavo_backend/manager/${entity}Manager.java`, managerContent);

    // Controller
    let pathName = entity === 'CareerPath' ? 'career-paths' : entity.toLowerCase() + 's';
    const controllerContent = `package com.example.pavo_backend.controller;

import com.example.pavo_backend.manager.${entity}Manager;
import com.example.pavo_backend.model.${entity};
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/${pathName}")
@CrossOrigin(origins = "*") // Allow nextjs to fetch
public class ${entity}Controller {
    private final ${entity}Manager manager;

    public ${entity}Controller(${entity}Manager manager) {
        this.manager = manager;
    }

    @GetMapping
    public List<${entity}> getAll() {
        return manager.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<${entity}> getById(@PathVariable String id) {
        return manager.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
`;
    fs.writeFileSync(`backend/src/main/java/com/example/pavo_backend/controller/${entity}Controller.java`, controllerContent);
});

console.log('Scaffolded DAOs, Managers, and Controllers for ' + entities.join(', '));
