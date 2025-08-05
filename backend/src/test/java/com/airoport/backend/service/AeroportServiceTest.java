package com.airoport.backend.service;


import com.airoport.backend.dto.AeroportDTO;
import com.airoport.backend.model.Aeroport;
import com.airoport.backend.repository.AeroportRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
public class AeroportServiceTest {

    @Mock
    private AeroportRepository aeroportRepository;

    @InjectMocks
    private AeroportService aeroportService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAeroportByIName_success() {
        List<Aeroport> mockList = Arrays.asList(new Aeroport("CMN"), new Aeroport("RAK"));
        when(aeroportRepository.findByNameContainingIgnoreCase("A")).thenReturn(mockList);

        List<Aeroport> result = aeroportService.getAeroportByIName("A");

        assertEquals(2, result.size());
        verify(aeroportRepository).findByNameContainingIgnoreCase("A");
    }

    @Test
    void testGetAeroportByIName_notFound() {
        when(aeroportRepository.findByNameContainingIgnoreCase("XYZ")).thenReturn(List.of());

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () ->
                aeroportService.getAeroportByIName("XYZ")
        );

        assertTrue(ex.getMessage().contains("Aucune aeroport trouvée"));
    }

    @Test
    void testGetdAll() {
        List<Aeroport> mockList = Arrays.asList(new Aeroport("CMN"), new Aeroport("RAK"));
        when(aeroportRepository.findAll()).thenReturn(mockList);

        List<Aeroport> result = aeroportService.getdAll();

        assertEquals(2, result.size());
        verify(aeroportRepository).findAll();
    }

    @Test
    void testCreateAeroport() {
        AeroportDTO dto = new AeroportDTO();
        dto.name = "Agadir";

        Aeroport saved = new Aeroport("Agadir");
        when(aeroportRepository.save(any(Aeroport.class))).thenReturn(saved);

        Aeroport result = aeroportService.createAeroport(dto);

        assertEquals("Agadir", result.getName());
        verify(aeroportRepository).save(any(Aeroport.class));
    }

    @Test
    void testUpdateAeroport_success() {
        Aeroport existing = new Aeroport("OldName");

        AeroportDTO dto = new AeroportDTO();
        dto.name = "NewName";

        when(aeroportRepository.findById(10)).thenReturn(Optional.of(existing));
        when(aeroportRepository.save(any(Aeroport.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Aeroport updated = aeroportService.updateAeroport(dto, 10);

        assertEquals("NewName", updated.getName());
        verify(aeroportRepository).findById(10);
        verify(aeroportRepository).save(existing);
    }

    @Test
    void testUpdateAeroport_notFound() {
        AeroportDTO dto = new AeroportDTO();
        dto.name = "Nothing";

        when(aeroportRepository.findById(99)).thenReturn(Optional.empty());

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () ->
                aeroportService.updateAeroport(dto, 99)
        );

        assertTrue(ex.getMessage().contains("non trouvée"));
    }

    @Test
    void testDeleteAeroport() {
        aeroportService.deleteAeroport(5);
        verify(aeroportRepository).deleteById(5);
    }
}
