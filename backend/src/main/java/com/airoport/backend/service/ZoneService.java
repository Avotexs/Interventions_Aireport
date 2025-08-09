package com.airoport.backend.service;

import com.airoport.backend.dto.ZoneDTO;
import com.airoport.backend.model.Zone;
import com.airoport.backend.repository.ComptoireRepository;
import com.airoport.backend.repository.ZoneRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ZoneService {

    private final ZoneRepository zoneRepo;
    private final ComptoireRepository comptoireRepo;

    public ZoneService(ZoneRepository zoneRepo, ComptoireRepository comptoireRepo) {
        this.zoneRepo = zoneRepo;
        this.comptoireRepo = comptoireRepo;
    }

    public List<Zone> getAll() { return zoneRepo.findAll(); }

    public List<Zone> searchByNom(String nom) {
        Optional<List<Zone>> opt = Optional.ofNullable(zoneRepo.findByNomContainingIgnoreCase(nom));
        if (opt.isPresent() && !opt.get().isEmpty()) return opt.get();
        throw new IllegalArgumentException("Aucune zone trouvée avec le nom : " + nom);
    }

    public Zone create(ZoneDTO dto) {
        Zone z = new Zone();
        z.setNom(dto.nom);
        return zoneRepo.save(z);
    }

    public Zone update(int id, ZoneDTO dto) {
        Zone zone = zoneRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Zone non trouvée id : " + id));
        zone.setNom(dto.nom);
        return zoneRepo.save(zone);
    }

    /** Suppression sécurisée : interdit si des comptoires existent */
    public void delete(int id) {
        if (comptoireRepo.existsByZone_Id(id))
            throw new IllegalStateException("Impossible de supprimer la zone : des comptoires y sont encore rattachés");
        zoneRepo.deleteById(id);
    }
}
