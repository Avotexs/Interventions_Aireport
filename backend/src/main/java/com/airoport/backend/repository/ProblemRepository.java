package com.airoport.backend.repository;
import com.airoport.backend.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, Integer> {

    List<Problem> findByNameContainingIgnoreCase(String name);
}
