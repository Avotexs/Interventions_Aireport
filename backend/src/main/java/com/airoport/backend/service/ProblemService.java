package com.airoport.backend.service;

import com.airoport.backend.dto.ProblemDTO;
import com.airoport.backend.model.Problem;
import com.airoport.backend.repository.ProblemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;

    public ProblemService(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    public List<Problem> getAll() {
        return problemRepository.findAll();
    }

    public List<Problem> searchByName(String name) {
        Optional<List<Problem>> optionalList = Optional.ofNullable(problemRepository.findByNameContainingIgnoreCase(name));
        if (optionalList.isPresent() && !optionalList.get().isEmpty()) {
            return optionalList.get();
        } else {
            throw new IllegalArgumentException("Aucun problème trouvé avec le nom : " + name);
        }
    }

    public Problem create(ProblemDTO dto) {
        Problem problem = new Problem();
        problem.setName(dto.name);
        return problemRepository.save(problem);
    }

    public Problem update(int id, ProblemDTO dto) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Problem non trouvé avec l'id : " + id));
        problem.setName(dto.name);
        return problemRepository.save(problem);
    }

    public void delete(int id) {
        problemRepository.deleteById(id);
    }
}
