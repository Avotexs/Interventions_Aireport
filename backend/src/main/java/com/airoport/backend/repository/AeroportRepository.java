package com.airoport.backend.repository;


import com.airoport.backend.model.Aeroport;
import com.airoport.backend.model.Campagny;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AeroportRepository extends JpaRepository<Aeroport, Integer> {

    List<Aeroport> findByNameContainingIgnoreCase(String name);
}
