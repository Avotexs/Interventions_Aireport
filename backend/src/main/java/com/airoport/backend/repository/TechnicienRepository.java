package com.airoport.backend.repository;

import com.airoport.backend.model.Technicien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TechnicienRepository extends JpaRepository<Technicien, Integer> {
    // Requêtes personnalisées ici si besoin
    Optional<Technicien> findByPseudoname(String pseudoname);
    boolean existsByPseudoname(String pseudoname);


}