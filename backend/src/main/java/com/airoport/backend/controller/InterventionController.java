package com.airoport.backend.controller;

import com.airoport.backend.dto.InterventionDTO;
import com.airoport.backend.service.InterventionService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/interventions")
public class InterventionController
{


    private final InterventionService interventionService;

    public InterventionController(InterventionService interventionService) {
        this.interventionService = interventionService;
    }

    @PostMapping
    public InterventionDTO create(@RequestBody InterventionDTO interventionDTO) {
        return interventionService.saveIntervention(interventionDTO);
    }

    @GetMapping
    public List<InterventionDTO> getAll() {
        return interventionService.getAllInterventions();
    }

    @GetMapping("/{id}")
    public InterventionDTO getById(@PathVariable int id) {
        return interventionService.getInterventionById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        interventionService.deleteIntervention(id);
    }

    @PutMapping("/{id}")
    public InterventionDTO update(@PathVariable int id, @RequestBody InterventionDTO interventionDTO) {
        return interventionService.updateIntervention(id, interventionDTO);
    }
}
