package com.airoport.backend.service;

import com.airoport.backend.dto.InterventionDTO;
import com.airoport.backend.model.*;
import com.airoport.backend.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterventionService {

    private final InterventionRepository interventionRepository;
    private final CampagnyRepository campagnyRepository;
    private final ZoneRepository zoneRepository;
    private final ComptoireRepository comptoireRepository;
    private final SolutionRepository solutionRepository;
    private final ProblemRepository problemRepository;
    private final AeroportRepository aeroportRepository;
    private final ProjectRepository projectRepository;
    private final TechnicienRepository technicienRepository;

    public InterventionService(InterventionRepository interventionRepository,
                               CampagnyRepository campagnyRepository,
                               ZoneRepository zoneRepository,
                               ComptoireRepository comptoireRepository,
                               SolutionRepository solutionRepository,
                               ProblemRepository problemRepository,
                               AeroportRepository aeroportRepository,
                               ProjectRepository projectRepository,
                               TechnicienRepository technicienRepository) {
        this.interventionRepository = interventionRepository;
        this.campagnyRepository = campagnyRepository;
        this.zoneRepository = zoneRepository;
        this.comptoireRepository = comptoireRepository;
        this.solutionRepository = solutionRepository;
        this.problemRepository = problemRepository;
        this.aeroportRepository = aeroportRepository;
        this.projectRepository = projectRepository;
        this.technicienRepository = technicienRepository;
    }

    public InterventionDTO saveIntervention(InterventionDTO dto) {
        Intervention intervention = dtoToEntity(dto);
        Intervention saved = interventionRepository.save(intervention);
        return entityToDto(saved);
    }

    public List<InterventionDTO> getAllInterventions() {
        return interventionRepository.findAll()
                .stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    public InterventionDTO getInterventionById(int id) {
        return interventionRepository.findById(id)
                .map(this::entityToDto)
                .orElse(null);
    }

    public void deleteIntervention(int id) {
        interventionRepository.deleteById(id);
    }

    public InterventionDTO updateIntervention(int id, InterventionDTO dto) {
        if (!interventionRepository.existsById(id)) return null;
        Intervention intervention = dtoToEntity(dto);
        intervention.setId(id);
        Intervention updated = interventionRepository.save(intervention);
        return entityToDto(updated);
    }

    private Intervention dtoToEntity(InterventionDTO dto) {
        Intervention intervention = new Intervention();
        intervention.setId(dto.getId());
        intervention.setNumero(dto.getNumero());
        intervention.setDate(dto.getDate());
        intervention.setDateDebut(dto.getDateDebut());
        intervention.setDateFin(dto.getDateFin());

        // Compute duration when both dates are present; else keep provided
        if (dto.getDateDebut() != null && dto.getDateFin() != null) {
            intervention.setDuration(Intervention.CalculeDuration(dto.getDateDebut(), dto.getDateFin()));
        } else {
            intervention.setDuration(dto.getDuration());
        }
        // inProgress is computed by entity lifecycle hooks

        // Map relations if IDs provided (> 0)
        if (dto.getCampagnyId() > 0) {
            Campagny entreprise = campagnyRepository.findById(dto.getCampagnyId())
                    .orElseThrow(() -> new IllegalArgumentException("Entreprise (Campagny) non trouvée: id=" + dto.getCampagnyId()));
            intervention.setCampagny(entreprise);
        }
        if (dto.getZoneId() > 0) {
            Zone zone = zoneRepository.findById(dto.getZoneId())
                    .orElseThrow(() -> new IllegalArgumentException("Zone non trouvée: id=" + dto.getZoneId()));
            intervention.setZone(zone);
        }
        if (dto.getComptoireId() > 0) {
            Comptoire comptoire = comptoireRepository.findById(dto.getComptoireId())
                    .orElseThrow(() -> new IllegalArgumentException("Comptoire non trouvé: id=" + dto.getComptoireId()));
            intervention.setComptoire(comptoire);
        }
        if (dto.getSolutionId() > 0) {
            Solution solution = solutionRepository.findById(dto.getSolutionId())
                    .orElseThrow(() -> new IllegalArgumentException("Solution non trouvée: id=" + dto.getSolutionId()));
            intervention.setSolution(solution);
        }
        if (dto.getProblemId() > 0) {
            Problem problem = problemRepository.findById(dto.getProblemId())
                    .orElseThrow(() -> new IllegalArgumentException("Problème non trouvé: id=" + dto.getProblemId()));
            intervention.setProbleme(problem);
        }
        if (dto.getAeroportId() > 0) {
            Aeroport aeroport = aeroportRepository.findById(dto.getAeroportId())
                    .orElseThrow(() -> new IllegalArgumentException("Aéroport non trouvé: id=" + dto.getAeroportId()));
            intervention.setAeroport(aeroport);
        }
        if (dto.getProjetId() != null && dto.getProjetId() > 0) {
            Project projet = projectRepository.findById(dto.getProjetId())
                    .orElseThrow(() -> new IllegalArgumentException("Projet non trouvé: id=" + dto.getProjetId()));
            intervention.setProjet(projet);
        }
        if (dto.getTechnicienId() > 0) {
            Technicien technicien = technicienRepository.findById(dto.getTechnicienId())
                    .orElseThrow(() -> new IllegalArgumentException("Technicien non trouvé: id=" + dto.getTechnicienId()));
            intervention.setTechnicien(technicien);
        }

        return intervention;
    }

    private InterventionDTO entityToDto(Intervention intervention) {
        InterventionDTO dto = new InterventionDTO();
        dto.setId(intervention.getId());
        dto.setNumero(intervention.getNumero());
        dto.setDate(intervention.getDate());
        dto.setDateDebut(intervention.getDateDebut());
        dto.setDateFin(intervention.getDateFin());
        dto.setDuration(intervention.getDuration());
        dto.setInProgress(intervention.isInProgress());

        // Include related IDs in response
        dto.setCampagnyId(intervention.getCampagny() != null ? intervention.getCampagny().getId() : 0);
        dto.setZoneId(intervention.getZone() != null ? intervention.getZone().getId() : 0);
        dto.setComptoireId(intervention.getComptoire() != null ? intervention.getComptoire().getId() : 0);
        dto.setSolutionId(intervention.getSolution() != null ? intervention.getSolution().getId() : 0);
        dto.setProblemId(intervention.getProbleme() != null ? intervention.getProbleme().getId() : 0);
        dto.setAeroportId(intervention.getAeroport() != null ? intervention.getAeroport().getId() : 0);
        dto.setProjetId(intervention.getProjet() != null ? intervention.getProjet().getId() : null);
        dto.setTechnicienId(intervention.getTechnicien() != null ? intervention.getTechnicien().getId() : 0);

        return dto;
    }
}
