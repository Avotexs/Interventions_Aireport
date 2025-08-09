package com.airoport.backend.repository;


import com.airoport.backend.model.ProjetEquipement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjetEquipementRepository extends JpaRepository<ProjetEquipement, Long> {
    List<ProjetEquipement> findByProjetId(Long projetId);
}

