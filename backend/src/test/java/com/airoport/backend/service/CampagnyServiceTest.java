package com.airoport.backend.service;


import com.airoport.backend.dto.CampagnyDTO;
import com.airoport.backend.model.Campagny;
import com.airoport.backend.repository.CampagnyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.mockito.ArgumentMatchers.any;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class CampagnyServiceTest {

    @Mock
    private CampagnyRepository campagnyRepository;

    @InjectMocks
    private CampagnyService campagnyService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllCampagnies() {
        List<Campagny> mockList = Arrays.asList(
                new Campagny("RAM"),
                new Campagny("Air Arabia")
        );
        when(campagnyRepository.findAll()).thenReturn(mockList);

        List<Campagny> result = campagnyService.getdAll();

        assertEquals(2, result.size());
        verify(campagnyRepository).findAll();
    }

    @Test
    void testSearchByNameFound() {
        List<Campagny> mockList = List.of(new Campagny("RAM"));
        when(campagnyRepository.findByNameContainingIgnoreCase("ram")).thenReturn(mockList);

        List<Campagny> result = campagnyService.getCampagnyByIName("ram");

        assertFalse(result.isEmpty());
        assertEquals("RAM", result.get(0).getName());
    }

    @Test
    void testSearchByNameNotFound() {
        when(campagnyRepository.findByNameContainingIgnoreCase("xx")).thenReturn(Collections.emptyList());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            campagnyService.getCampagnyByIName("xx");
        });

        assertTrue(exception.getMessage().contains("Aucune compagnie trouvée"));
    }

    @Test
    void testCreateCampagny() {
        CampagnyDTO dto = new CampagnyDTO("RAM");
        Campagny saved = new Campagny("RAM");

        when(campagnyRepository.save(any(Campagny.class))).thenReturn(saved);

        Campagny result = campagnyService.createCampagny(dto);

        assertEquals("RAM", result.getName());
        verify(campagnyRepository).save(any(Campagny.class));
    }

    @Test
    void testUpdateCampagnySuccess() {
        Campagny existing = new Campagny("Old Name");
        CampagnyDTO dto = new CampagnyDTO("Updated Name");

        when(campagnyRepository.findById(1)).thenReturn(Optional.of(existing));
        when(campagnyRepository.save(existing)).thenReturn(existing);

        Campagny result = campagnyService.updateCampagny(dto, 1);

        assertEquals("Updated Name", result.getName());
    }

    @Test
    void testUpdateCampagnyNotFound() {
        CampagnyDTO dto = new CampagnyDTO("Nouvelle compagnie");
        when(campagnyRepository.findById(99)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            campagnyService.updateCampagny(dto, 99);
        });

        assertTrue(exception.getMessage().contains("non trouvée"));
    }

    @Test
    void testDeleteCampagny() {
        doNothing().when(campagnyRepository).deleteById(1);

        campagnyService.deleteCampagny(1);

        verify(campagnyRepository).deleteById(1);
    }
}
