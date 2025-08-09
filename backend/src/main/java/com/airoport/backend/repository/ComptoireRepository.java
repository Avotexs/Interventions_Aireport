package com.airoport.backend.repository;

import com.airoport.backend.model.Comptoire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComptoireRepository extends JpaRepository<Comptoire, Integer> {
    List<Comptoire> findByNomContainingIgnoreCase(String nom);
    boolean existsByZone_Id(int zoneId);   // pour savoir si une zone possède encore des comptoires
}
