package com.airoport.backend.service;

import com.airoport.backend.dto.EquipementDTO;
import com.airoport.backend.dto.ProjectDTO;
import com.airoport.backend.model.Equipement;
import com.airoport.backend.model.Project;
import com.airoport.backend.model.ProjetEquipement;
import com.airoport.backend.repository.EquipementRepository;
import com.airoport.backend.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private EquipementRepository equipementRepository;

    @Transactional
    public Project createProject(ProjectDTO dto) {
        Project project = new Project();
        project.setName(dto.name);

        for (EquipementDTO eDto : dto.equipements) {
            Equipement equipement = equipementRepository.findById(eDto.equipementId)
                    .orElseThrow(() -> new RuntimeException("Equipement introuvable"));

            if (equipement.getQuantiteTotal() < eDto.quantite) {
                throw new RuntimeException("Stock insuffisant pour " + equipement.getNameEquipement());
            }

            equipement.setQuantiteTotal(equipement.getQuantiteTotal() - eDto.quantite);
            equipementRepository.save(equipement);

            ProjetEquipement lien = new ProjetEquipement();
            lien.setProjet(project);
            lien.setEquipement(equipement);
            lien.setQuantiteReservee(eDto.quantite);

            project.getProjetEquipements().add(lien);
        }

        return projectRepository.save(project);
    }


    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    @Transactional
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Projet introuvable"));

        // Réincrémente le stock
        project.getProjetEquipements().forEach(pe -> {
            Equipement eq = pe.getEquipement();
            eq.setQuantiteTotal(eq.getQuantiteTotal() + pe.getQuantiteReservee());
            equipementRepository.save(eq);
        });

        projectRepository.delete(project);
    }

    @Transactional
    public Project updateProject(Long id, ProjectDTO dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Projet introuvable"));

        project.setName(dto.name);

        // Index des réservations existantes
        Map<Long, ProjetEquipement> currentMap = project.getProjetEquipements().stream()
                .collect(Collectors.toMap(pe -> pe.getEquipement().getId(), pe -> pe));

        // Équipements envoyés dans la modif
        for (EquipementDTO eDto : dto.equipements) {
            Equipement equipement = equipementRepository.findById(eDto.equipementId)
                    .orElseThrow(() -> new EntityNotFoundException("Equipement introuvable"));

            if (currentMap.containsKey(eDto.equipementId)) {
                // Équipement déjà présent → comparer quantité
                ProjetEquipement existingLink = currentMap.get(eDto.equipementId);
                int diff = eDto.quantite - existingLink.getQuantiteReservee();

                if (diff > 0) {
                    // Augmentation → vérifier stock
                    if (equipement.getQuantiteTotal() < diff) {
                        throw new IllegalArgumentException("Stock insuffisant pour " + equipement.getNameEquipement());
                    }
                    equipement.setQuantiteTotal(equipement.getQuantiteTotal() - diff);
                } else if (diff < 0) {
                    // Diminution → rendre stock
                    equipement.setQuantiteTotal(equipement.getQuantiteTotal() + Math.abs(diff));
                }
                existingLink.setQuantiteReservee(eDto.quantite);
                equipementRepository.save(equipement);
            } else {
                // Nouvel équipement → réserver stock
                if (equipement.getQuantiteTotal() < eDto.quantite) {
                    throw new IllegalArgumentException("Stock insuffisant pour " + equipement.getNameEquipement());
                }
                equipement.setQuantiteTotal(equipement.getQuantiteTotal() - eDto.quantite);
                equipementRepository.save(equipement);

                ProjetEquipement newLink = new ProjetEquipement(project, equipement, eDto.quantite);
                project.getProjetEquipements().add(newLink);
            }
        }

        // Gestion des équipements retirés
        Set<Long> newIds = dto.equipements.stream()
                .map(e -> e.equipementId)
                .collect(Collectors.toSet());

        List<ProjetEquipement> toRemove = project.getProjetEquipements().stream()
                .filter(pe -> !newIds.contains(pe.getEquipement().getId()))
                .toList();

        toRemove.forEach(pe -> {
            Equipement eq = pe.getEquipement();
            eq.setQuantiteTotal(eq.getQuantiteTotal() + pe.getQuantiteReservee());
            equipementRepository.save(eq);
            project.getProjetEquipements().remove(pe);
        });

        return projectRepository.save(project);
    }


}