package com.airoport.backend.service;



import com.airoport.backend.dto.SolutionDTO;
import com.airoport.backend.model.Solution;
import com.airoport.backend.repository.SolutionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SolutionService {
    private final SolutionRepository solutionRepository;
    public SolutionService(SolutionRepository solutionRepository) {
        this.solutionRepository = solutionRepository;
    }

    public List<Solution> getSolutionByName(String name) {
        try {
            Optional<List<Solution>> optionalList = Optional.ofNullable(solutionRepository.findByNameContainingIgnoreCase(name));

            if (optionalList.isPresent() && !optionalList.get().isEmpty()) {
                return optionalList.get();
            } else {
                throw new IllegalArgumentException("Aucune solution trouvée avec le nom : " + name);
            }

        } catch (Exception e) {
            // Log (optionnel) et rethrow ou gestion personnalisée
            System.err.println("Erreur lors de la recherche de la solution : " + e.getMessage());
            throw new RuntimeException("Erreur interne lors de la recherche des solutions", e);
        }
    }

    public List<Solution> getSolutionsByDateRange(LocalDateTime start, LocalDateTime end) {
        return solutionRepository.findByCreatedAtBetween(start, end);
    }

    public long getTotalSolutions() {
        return solutionRepository.count();
    }



    public List<Solution> getdAll() {
        return solutionRepository.findAll();
    }

    public Solution createSolution(SolutionDTO solutionDTO) {
        Solution solution=new Solution();
        solution.setName(solutionDTO.name);
        return solutionRepository.save(solution);
    }

    public void deleteSolution(int id) {
        solutionRepository.deleteById(id);

    }

    public Solution updateSolution(SolutionDTO solutionDTO, int id) {
        Solution solution = solutionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Campagny non trouvée avec id: " + id));

        solution.setName(solutionDTO.name);

        return solutionRepository.save(solution);
    }



}
