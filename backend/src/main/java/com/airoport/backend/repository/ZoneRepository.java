package com.airoport.backend.repository;

import com.airoport.backend.model.Zone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZoneRepository extends JpaRepository<Zone, Integer> {
    List<Zone> findByNomContainingIgnoreCase(String nom);
}
