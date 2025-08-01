package com.airoport.backend.service;
import com.airoport.backend.dto.SolutionDTO;
import com.airoport.backend.model.Solution;
import com.airoport.backend.repository.SolutionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
public class SolutionServiceTest {

    private SolutionRepository solutionRepository;
    private SolutionService solutionService;

    @BeforeEach
    void setUp() {
        solutionRepository = mock(SolutionRepository.class);
        solutionService = new SolutionService(solutionRepository);
    }

    @Test
    void testGetSolutionByName_ReturnsResults() {
        Solution solution = new Solution();
        solution.setId(1);
        solution.setName("Test Solution");
        List<Solution> solutions = Collections.singletonList(solution);

        when(solutionRepository.findByNameContainingIgnoreCase("test")).thenReturn(solutions);

        List<Solution> result = solutionService.getSolutionByName("test");
        assertEquals(1, result.size());
        assertEquals("Test Solution", result.get(0).getName());
    }

    @Test
    void testGetSolutionByName_ThrowsIfNotFound() {
        when(solutionRepository.findByNameContainingIgnoreCase("none")).thenReturn(Collections.emptyList());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            solutionService.getSolutionByName("none");
        });
        assertTrue(exception.getMessage().contains("Erreur interne"));
    }

    @Test
    void testGetdAll() {
        Solution s1 = new Solution();

        s1.setName("Sol1");
        Solution s2 = new Solution();

        s2.setName("Sol2");
        List<Solution> solutions = Arrays.asList(s1, s2);

        when(solutionRepository.findAll()).thenReturn(solutions);

        List<Solution> result = solutionService.getdAll();
        assertEquals(2, result.size());
        assertEquals("Sol1", result.get(0).getName());
    }

    @Test
    void testCreateSolution() {
        SolutionDTO dto = new SolutionDTO();
        dto.name = "Nouvelle solution";

        Solution saved = new Solution();

        saved.setName("Nouvelle solution");

        when(solutionRepository.save(any(Solution.class))).thenReturn(saved);

        Solution result = solutionService.createSolution(dto);

        assertEquals("Nouvelle solution", result.getName());
        verify(solutionRepository).save(any(Solution.class));
    }

    @Test
    void testDeleteSolution() {
        int id = 3;
        solutionService.deleteSolution(id);
        verify(solutionRepository).deleteById(id);
    }

    @Test
    void testUpdateSolution_Success() {
        int id = 7;
        SolutionDTO dto = new SolutionDTO();
        dto.name = "Mise à jour";
        Solution existing = new Solution();

        existing.setName("Ancien nom");

        when(solutionRepository.findById(id)).thenReturn(Optional.of(existing));
        when(solutionRepository.save(existing)).thenReturn(existing);

        Solution result = solutionService.updateSolution(dto, id);

        assertEquals("Mise à jour", result.getName());
        verify(solutionRepository).save(existing);
    }

    @Test
    void testUpdateSolution_NotFound() {
        int id = 88;
        SolutionDTO dto = new SolutionDTO();
        dto.name = "Whatever";

        when(solutionRepository.findById(id)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            solutionService.updateSolution(dto, id);
        });

        assertTrue(exception.getMessage().contains("Campagny non trouvée"));
    }
}
