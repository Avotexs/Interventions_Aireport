package com.airoport.backend.service;

import com.airoport.backend.dto.TechnicienDTO;
import com.airoport.backend.model.Aeroport;
import com.airoport.backend.model.Technicien;
import com.airoport.backend.repository.AeroportRepository;
import com.airoport.backend.repository.TechnicienRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
public class TechnicienServiceTest {

    @Mock
    private TechnicienRepository technicienRepository;

    @Mock
    private AeroportRepository aeroportRepository;

    @InjectMocks
    private TechnicienService technicienService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAll() {
        Technicien t1 = new Technicien("Ali", "Ben", "AliTech", "technicien", "pass123", 1);
        Technicien t2 = new Technicien("Sara", "Saidi", "SaraTech", "technicien", "pass456", 2);
        when(technicienRepository.findAll()).thenReturn(Arrays.asList(t1, t2));

        List<Technicien> result = technicienService.getAll();

        assertEquals(2, result.size());
        verify(technicienRepository, times(1)).findAll();
    }

    @Test
    void testCreateTechnicien_Success() {
        TechnicienDTO dto = new TechnicienDTO("Ali", "Ben", "AliTech", "technicien", "pass123", 1);
        Aeroport aeroport = new Aeroport();


        when(aeroportRepository.findById(1)).thenReturn(Optional.of(aeroport));

        Technicien saved = new Technicien("Ali", "Ben", "AliTech", "technicien", "pass123", 1);
        when(technicienRepository.save(any())).thenReturn(saved);

        Technicien result = technicienService.createTechnicien(dto);

        assertNotNull(result);
        assertEquals("Ali", result.getFirstname());
        verify(aeroportRepository, times(1)).findById(1);
        verify(technicienRepository, times(1)).save(any(Technicien.class));
    }

    @Test
    void testCreateTechnicien_AeroportNotFound() {
        TechnicienDTO dto = new TechnicienDTO("Ali", "Ben", "AliTech", "technicien", "pass123", 999);

        when(aeroportRepository.findById(999)).thenReturn(Optional.empty());

        Exception exception = assertThrows(IllegalArgumentException.class, () ->
                technicienService.createTechnicien(dto));

        assertEquals("Aéroport non trouvé", exception.getMessage());
        verify(aeroportRepository, times(1)).findById(999);
        verify(technicienRepository, never()).save(any());
    }

    @Test
    void testUpdateTechnicien_Success() {
        Technicien existing = new Technicien("Old", "Name", "OldPseudo", "technicien", "oldpass", 1);

        Aeroport aeroport = new Aeroport();


        TechnicienDTO dto = new TechnicienDTO("New", "Updated", "NewPseudo", "technicien", "newpass", 2);

        when(technicienRepository.findById(1)).thenReturn(Optional.of(existing));
        when(aeroportRepository.findById(2)).thenReturn(Optional.of(aeroport));
        when(technicienRepository.save(any())).thenReturn(existing);

        Technicien result = technicienService.updateTechnicien(1, dto);

        assertEquals("New", result.getFirstname());
        assertEquals("Updated", result.getLastname());
        verify(technicienRepository).save(existing);
    }

    @Test
    void testDeleteTechnicien() {
        technicienService.deleteTechnicien(1);
        verify(technicienRepository).deleteById(1);
    }
}

