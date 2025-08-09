package com.airoport.backend.service;

import com.airoport.backend.dto.ComptoireDTO;
import com.airoport.backend.model.Comptoire;
import com.airoport.backend.model.Zone;
import com.airoport.backend.repository.ComptoireRepository;
import com.airoport.backend.repository.ZoneRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComptoireService {

    private final ComptoireRepository comptoireRepo;
    private final ZoneRepository zoneRepo;

    public ComptoireService(ComptoireRepository comptoireRepo, ZoneRepository zoneRepo) {
        this.comptoireRepo = comptoireRepo;
        this.zoneRepo = zoneRepo;
    }

    public List<Comptoire> getAll() { return comptoireRepo.findAll(); }

    public List<Comptoire> searchByNom(String nom) {
        Optional<List<Comptoire>> opt = Optional.ofNullable(comptoireRepo.findByNomContainingIgnoreCase(nom));
        if (opt.isPresent() && !opt.get().isEmpty()) return opt.get();
        throw new IllegalArgumentException("Aucun comptoire trouvé avec le nom : " + nom);
    }

    public Comptoire create(ComptoireDTO dto) {
        Zone zone = zoneRepo.findById(dto.zoneId)
                .orElseThrow(() -> new IllegalArgumentException("Zone non trouvée id : " + dto.zoneId));

        Comptoire c = new Comptoire();
        c.setNom(dto.nom);
        c.setZone(zone);
        return comptoireRepo.save(c);
    }

    public Comptoire update(int id, ComptoireDTO dto) {
        Comptoire c = comptoireRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Comptoire non trouvé id : " + id));

        c.setNom(dto.nom);
        if (dto.zoneId != 0) {
            Zone zone = zoneRepo.findById(dto.zoneId)
                    .orElseThrow(() -> new IllegalArgumentException("Zone non trouvée id : " + dto.zoneId));
            c.setZone(zone);
        }
        return comptoireRepo.save(c);
    }

    public void delete(int id) { comptoireRepo.deleteById(id); }
}
