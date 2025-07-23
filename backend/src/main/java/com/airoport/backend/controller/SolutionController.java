package com.airoport.backend.controller;


import com.airoport.backend.dto.SolutionDTO;
import com.airoport.backend.model.Solution;
import com.airoport.backend.service.SolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/solutions")
public class SolutionController {

    private final SolutionService solutionService;

    @Autowired
    public SolutionController(SolutionService solutionService) {
        this.solutionService = solutionService;
    }


    @GetMapping
    public ResponseEntity<List<Solution>> getAll() {
        return ResponseEntity.ok(solutionService.getdAll());
    }

    // 🔹 GET: Rechercher par nom
    @GetMapping("/search")
    public ResponseEntity<List<Solution>> searchByName(@RequestParam String name) {
        return ResponseEntity.ok(solutionService.getSolutionByName(name));
    }

    // 🔹 POST: Créer une nouvelle solution
    @PostMapping
    public ResponseEntity<Solution> create(@RequestBody SolutionDTO dto) {
        return ResponseEntity.ok(solutionService.createSolution(dto));
    }

    // 🔹 PUT: Mettre à jour une solution existante
    @PutMapping("/{id}")
    public ResponseEntity<Solution> update(@PathVariable int id, @RequestBody SolutionDTO dto) {
        return ResponseEntity.ok(solutionService.updateSolution(dto, id));
    }

    // 🔹 DELETE: Supprimer une solution par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        solutionService.deleteSolution(id);
        return ResponseEntity.noContent().build();
    }


}
