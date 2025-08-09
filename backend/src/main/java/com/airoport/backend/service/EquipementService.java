package com.airoport.backend.service;

import com.airoport.backend.dto.EquipementDTO;
import com.airoport.backend.model.Equipement;
import com.airoport.backend.repository.EquipementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipementService {

    @Autowired
    private EquipementRepository equipementRepository;

    public Equipement createEquipement(EquipementDTO dto) {
        Equipement equipement = new Equipement();
        equipement.setNameEquipement(dto.nameEquipement);
        equipement.setQuantite(dto.quantite);
        return equipementRepository.save(equipement);
    }

    public List<Equipement> getAllEquipements() {
        return equipementRepository.findAll();
    }

    public Optional<Equipement> getEquipementById(Long id) {
        return equipementRepository.findById(id);
    }

    public Equipement updateEquipement(Long id, EquipementDTO dto) {
        return equipementRepository.findById(id).map(equipement -> {
            equipement.setNameEquipement(dto.nameEquipement);
            equipement.setQuantite(dto.quantite);
            return equipementRepository.save(equipement);
        }).orElseThrow(() -> new RuntimeException("Équipement non trouvé"));
    }

    public void deleteEquipement(Long id) {
        equipementRepository.deleteById(id);
    }
}
