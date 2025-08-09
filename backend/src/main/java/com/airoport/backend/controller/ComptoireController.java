package com.airoport.backend.controller;

import com.airoport.backend.dto.ComptoireDTO;
import com.airoport.backend.model.Comptoire;
import com.airoport.backend.service.ComptoireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/comptoires")
public class ComptoireController {

    private final ComptoireService comptoireService;

    @Autowired
    public ComptoireController(ComptoireService comptoireService) { this.comptoireService = comptoireService; }

    @GetMapping
    public ResponseEntity<List<ComptoireDTO>> getAll() {
        List<Comptoire> entities = comptoireService.getAll();
        List<ComptoireDTO> dtos = entities.stream()
            .map(c -> {
                ComptoireDTO dto = new ComptoireDTO();
                dto.id = c.getId();
                dto.nom = c.getNom();
                dto.zoneId = c.getZone() != null ? c.getZone().getId() : 0;
                return dto;
            })
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ComptoireDTO>> search(@RequestParam String nom) {
        List<Comptoire> entities = comptoireService.searchByNom(nom);
        List<ComptoireDTO> dtos = entities.stream()
            .map(c -> {
                ComptoireDTO dto = new ComptoireDTO();
                dto.id = c.getId();
                dto.nom = c.getNom();
                dto.zoneId = c.getZone() != null ? c.getZone().getId() : 0;
                return dto;
            })
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<Comptoire> create(@RequestBody ComptoireDTO dto) {
        return ResponseEntity.ok(comptoireService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comptoire> update(@PathVariable int id, @RequestBody ComptoireDTO dto) {
        return ResponseEntity.ok(comptoireService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        comptoireService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
