package com.airoport.backend.controller;

import com.airoport.backend.dto.ZoneDTO;
import com.airoport.backend.model.Zone;
import com.airoport.backend.service.ZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/zones")
public class ZoneController {

    private final ZoneService zoneService;

    @Autowired
    public ZoneController(ZoneService zoneService) { this.zoneService = zoneService; }

    @GetMapping
    public ResponseEntity<List<Zone>> getAll() {
        return ResponseEntity.ok(zoneService.getAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Zone>> search(@RequestParam String nom) {
        return ResponseEntity.ok(zoneService.searchByNom(nom));
    }

    @PostMapping
    public ResponseEntity<Zone> create(@RequestBody ZoneDTO dto) {
        return ResponseEntity.ok(zoneService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Zone> update(@PathVariable int id, @RequestBody ZoneDTO dto) {
        return ResponseEntity.ok(zoneService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        zoneService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
