package com.airoport.backend.service;

import com.airoport.backend.dto.ProblemDTO;
import com.airoport.backend.model.Problem;
import com.airoport.backend.repository.ProblemRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
public class ProblemServiceTest {
    private ProblemRepository problemRepository;
    private ProblemService problemService;

    @BeforeEach
    void setUp() {
        problemRepository = mock(ProblemRepository.class);
        problemService = new ProblemService(problemRepository);
    }

    @Test
    void testGetAll() {
        Problem p1 = new Problem();

        p1.setName("Problem 1");
        Problem p2 = new Problem();

        p2.setName("Problem 2");
        List<Problem> problems = Arrays.asList(p1, p2);

        when(problemRepository.findAll()).thenReturn(problems);

        List<Problem> result = problemService.getAll();
        assertEquals(2, result.size());
        assertEquals("Problem 1", result.get(0).getName());
    }

    @Test
    void testSearchByNameReturnsResults() {
        Problem p = new Problem();

        p.setName("Test Problem");
        List<Problem> problems = Collections.singletonList(p);

        when(problemRepository.findByNameContainingIgnoreCase("test")).thenReturn(problems);

        List<Problem> result = problemService.searchByName("test");
        assertEquals(1, result.size());
        assertEquals("Test Problem", result.get(0).getName());
    }

    @Test
    void testSearchByNameThrowsIfNotFound() {
        when(problemRepository.findByNameContainingIgnoreCase("none")).thenReturn(Collections.emptyList());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            problemService.searchByName("none");
        });

        assertTrue(exception.getMessage().contains("Aucun problème trouvé avec le nom"));
    }

    @Test
    void testCreate() {
        ProblemDTO dto = new ProblemDTO();
        dto.name = "New Problem";

        Problem saved = new Problem();

        saved.setName("New Problem");

        when(problemRepository.save(any(Problem.class))).thenReturn(saved);

        Problem result = problemService.create(dto);

        assertEquals("New Problem", result.getName());

        ArgumentCaptor<Problem> captor = ArgumentCaptor.forClass(Problem.class);
        verify(problemRepository).save(captor.capture());
        assertEquals("New Problem", captor.getValue().getName());
    }

    @Test
    void testUpdateSuccess() {
        int id = 1;
        ProblemDTO dto = new ProblemDTO();
        dto.name = "Updated Name";
        Problem existing = new Problem();

        existing.setName("Old Name");

        when(problemRepository.findById(id)).thenReturn(Optional.of(existing));
        when(problemRepository.save(existing)).thenReturn(existing);

        Problem result = problemService.update(id, dto);

        assertEquals("Updated Name", result.getName());
        verify(problemRepository).save(existing);
    }

    @Test
    void testUpdateThrowsIfNotFound() {
        int id = 999;
        ProblemDTO dto = new ProblemDTO();
        dto.name = "Doesn't matter";

        when(problemRepository.findById(id)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            problemService.update(id, dto);
        });

        assertTrue(exception.getMessage().contains("Problem non trouvé avec l'id"));
    }

    @Test
    void testDelete() {
        int id = 5;
        problemService.delete(id);
        verify(problemRepository).deleteById(id);
    }
}
