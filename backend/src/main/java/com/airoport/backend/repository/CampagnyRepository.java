package com.airoport.backend.repository;


import com.airoport.backend.model.Campagny;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface CampagnyRepository extends JpaRepository<Campagny, Integer> {

   // @Query("SELECT b FROM Campagny b WHERE b.name = :name")
   // @Query("SELECT * FROM campagny WHERE LOWER(nom) LIKE LOWER('%ta%')")
     List <Campagny> findByNameContainingIgnoreCase(String name);

    //Object findByIName(String ram);
}
