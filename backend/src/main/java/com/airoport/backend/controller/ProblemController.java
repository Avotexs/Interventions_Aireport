package com.airoport.backend.controller;

import com.airoport.backend.dto.ProblemDTO;
import com.airoport.backend.model.Problem;
import com.airoport.backend.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    private final ProblemService problemService;

    @Autowired
    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping
    public ResponseEntity<List<Problem>> getAll() {
        return ResponseEntity.ok(problemService.getAll());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Problem>> searchByName(@RequestParam String name) {
        return ResponseEntity.ok(problemService.searchByName(name));
    }

    @PostMapping
    public ResponseEntity<Problem> create(@RequestBody ProblemDTO dto) {
        return ResponseEntity.ok(problemService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Problem> update(@PathVariable int id, @RequestBody ProblemDTO dto) {
        return ResponseEntity.ok(problemService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        problemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
