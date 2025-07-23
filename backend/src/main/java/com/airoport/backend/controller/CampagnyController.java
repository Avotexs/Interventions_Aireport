package com.airoport.backend.controller;


import com.airoport.backend.dto.CampagnyDTO;
import com.airoport.backend.model.Campagny;
import com.airoport.backend.service.CampagnyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/campagnies")
//@CrossOrigin(origins = "*") // Pour autoriser les appels depuis le frontend (Angular, React, etc.)
public class CampagnyController {


    private final CampagnyService campagnyService;

    @Autowired
    public CampagnyController(CampagnyService campagnyService) {
        this.campagnyService = campagnyService;
    }

    // 🔹 GET: Tous les Campagny
    @GetMapping
    public ResponseEntity<List<Campagny>> getAll() {
        return ResponseEntity.ok(campagnyService.getdAll());
    }

    // 🔹 GET: Rechercher par nom
    @GetMapping("/search")
    public ResponseEntity<List<Campagny>> searchByName(@RequestParam String name) {
        return ResponseEntity.ok(campagnyService.getCampagnyByIName(name));
    }

    // 🔹 POST: Créer une nouvelle Campagny
    @PostMapping
    public ResponseEntity<Campagny> create(@RequestBody CampagnyDTO dto) {
        return ResponseEntity.ok(campagnyService.createCampagny(dto));
    }

    // 🔹 PUT: Mettre à jour une Campagny existante
    @PutMapping("/{id}")
    public ResponseEntity<Campagny> update(@PathVariable int id, @RequestBody CampagnyDTO dto) {
        return ResponseEntity.ok(campagnyService.updateCampagny(dto, id));
    }

    // 🔹 DELETE: Supprimer une Campagny par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        campagnyService.deleteCampagny(id);
        return ResponseEntity.noContent().build();
    }

}
