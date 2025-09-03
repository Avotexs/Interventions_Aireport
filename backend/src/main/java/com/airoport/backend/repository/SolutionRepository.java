package com.airoport.backend.repository;

import com.airoport.backend.model.Solution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SolutionRepository extends JpaRepository<Solution, Integer> {

    List<Solution> findByNameContainingIgnoreCase(String name);

    List<Solution> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    long count();
}
