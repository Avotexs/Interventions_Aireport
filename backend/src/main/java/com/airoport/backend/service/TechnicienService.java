package com.airoport.backend.service;
import com.airoport.backend.dto.TechnicienDTO;
import com.airoport.backend.model.Aeroport;
import com.airoport.backend.model.Technicien;
import com.airoport.backend.repository.AeroportRepository;
import com.airoport.backend.repository.TechnicienRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnicienService {

    private final TechnicienRepository technicienRepository;
    private final AeroportRepository aeroportRepository;

    public TechnicienService(TechnicienRepository technicienRepository, AeroportRepository aeroportRepository) {
        this.technicienRepository = technicienRepository;
        this.aeroportRepository = aeroportRepository;
    }
    public TechnicienDTO convertTDTO(Technicien technicien) {
        return new TechnicienDTO(

                technicien.getFirstname(),
                technicien.getLastname(),
                technicien.getPseudoname(),
                technicien.getRole(),
                technicien.getMotDePass(),
                technicien.getAeroportId()
        );
    }
    public List<Technicien> getAll() {
        return technicienRepository.findAll();
    }
    public Technicien createTechnicien(TechnicienDTO dto) {
        Aeroport aeroport = aeroportRepository.findById(dto.aeroportId)
                .orElseThrow(() -> new IllegalArgumentException("Aéroport non trouvé avec l'ID : " + dto.aeroportId)); // Include the ID in the message

        Technicien technicien = new Technicien(
                dto.firstname, dto.lastname, dto.pseudoname, dto.role, dto.motDePass, dto.aeroportId
        );
        return technicienRepository.save(technicien);
    }

    public Technicien updateTechnicien(int id, TechnicienDTO dto) {
        Technicien technicien = technicienRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Technicien non trouvé"));
        Aeroport aeroport = aeroportRepository.findById(dto.aeroportId)
                .orElseThrow(() -> new IllegalArgumentException("Aéroport non trouvé"));

        technicien.setfirstName(dto.firstname);
        technicien.setLastname(dto.lastname);
        technicien.setPseudoname(dto.pseudoname);
        technicien.setRole(dto.role);
        technicien.setMotDePass(dto.motDePass);
        technicien.setAeroportId(dto.aeroportId);
        return technicienRepository.save(technicien);
    }

    public void deleteTechnicien(int id) {
        technicienRepository.deleteById(id);
    }
}
