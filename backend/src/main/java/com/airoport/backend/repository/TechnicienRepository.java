package com.airoport.backend.repository;

import com.airoport.backend.model.Technicien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnicienRepository extends JpaRepository<Technicien, Integer> {
    // Requêtes personnalisées ici si besoin


}