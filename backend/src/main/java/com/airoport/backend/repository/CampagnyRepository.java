package com.airoport.backend.repository;

import com.airoport.backend.model.Campagny;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CampagnyRepository extends JpaRepository<Campagny, Integer> {

    List<Campagny> findByNameContainingIgnoreCase(String name);

    List<Campagny> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    long count();
}
