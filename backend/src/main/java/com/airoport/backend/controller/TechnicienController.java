package com.airoport.backend.controller;

import com.airoport.backend.dto.TechnicienDTO;
import com.airoport.backend.model.Technicien;
import com.airoport.backend.service.TechnicienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/techniciens")
public class TechnicienController {

    private final TechnicienService technicienService;

    @Autowired
    public TechnicienController(TechnicienService technicienService) {
        this.technicienService = technicienService;
    }

    @GetMapping
    public ResponseEntity<List<Technicien>> getAll() {

        return ResponseEntity.ok(technicienService.getAll());
    }

    @PostMapping
    public ResponseEntity<Technicien> create(@RequestBody TechnicienDTO dto) {
        return ResponseEntity.ok(technicienService.createTechnicien(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Technicien> update(@PathVariable int id, @RequestBody TechnicienDTO dto) {
        return ResponseEntity.ok(technicienService.updateTechnicien(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        technicienService.deleteTechnicien(id);
        return ResponseEntity.noContent().build();
    }
}
