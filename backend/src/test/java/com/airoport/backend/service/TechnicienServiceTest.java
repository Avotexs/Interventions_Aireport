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
        Technicien tech1 = new Technicien("Ali", "Sami", "pseudo1", "admin", "pass", new Aeroport("CMN"));
        Technicien tech2 = new Technicien("Zineb", "Nour", "pseudo2", "tech", "1234", new Aeroport("RAK"));
        when(technicienRepository.findAll()).thenReturn(Arrays.asList(tech1, tech2));

        List<Technicien> result = technicienService.getAll();

        assertEquals(2, result.size());
        verify(technicienRepository, times(1)).findAll();
    }

    @Test
    void testCreateTechnicien() {
        Aeroport aeroport = new Aeroport("CMN");


        TechnicienDTO dto = new TechnicienDTO();
        dto.name = "Omar";
        dto.lastname = "El Fassi";
        dto.pseudoname = "omar2000";
        dto.role = "admin";
        dto.motDePass = "pass123";
        dto.aeroportId = 1;

        when(aeroportRepository.findById(1)).thenReturn(Optional.of(aeroport));
        when(technicienRepository.save(any(Technicien.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Technicien created = technicienService.createTechnicien(dto);

        assertEquals(dto.name, created.getName());
        assertEquals(dto.lastname, created.getLastname());
        assertEquals(dto.pseudoname, created.getPseudoname());
        assertEquals(dto.role, created.getRole());
        assertEquals(dto.motDePass, created.getMotDePass());
        assertEquals(aeroport, created.getAeroport());
    }

    @Test
    void testUpdateTechnicien() {
        Aeroport oldAeroport = new Aeroport("CMN");

        Aeroport newAeroport = new Aeroport("RAK");


        Technicien existing = new Technicien("Ali", "Sami", "pseudo1", "tech", "pass", oldAeroport);


        TechnicienDTO dto = new TechnicienDTO();
        dto.name = "Ali";
        dto.lastname = "Sami";
        dto.pseudoname = "updated";
        dto.role = "tech";
        dto.motDePass = "newpass";
        dto.aeroportId = 2;

        when(technicienRepository.findById(10)).thenReturn(Optional.of(existing));
        when(aeroportRepository.findById(2)).thenReturn(Optional.of(newAeroport));
        when(technicienRepository.save(any(Technicien.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Technicien updated = technicienService.updateTechnicien(10, dto);

        assertEquals("updated", updated.getPseudoname());
        assertEquals("newpass", updated.getMotDePass());
        assertEquals(newAeroport, updated.getAeroport());
    }

    @Test
    void testDeleteTechnicien() {
        int idToDelete = 5;

        technicienService.deleteTechnicien(idToDelete);

        verify(technicienRepository, times(1)).deleteById(idToDelete);
    }
}

