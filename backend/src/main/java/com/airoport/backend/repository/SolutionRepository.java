package com.airoport.backend.repository;


import com.airoport.backend.model.Solution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolutionRepository extends JpaRepository<Solution , Integer> {
    List<Solution> findByNameContainingIgnoreCase(String name);

}
