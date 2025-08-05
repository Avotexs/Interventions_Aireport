package com.airoport.backend.service;

import com.airoport.backend.dto.AeroportDTO;
import com.airoport.backend.dto.CampagnyDTO;
import com.airoport.backend.model.Aeroport;
import com.airoport.backend.model.Campagny;
import com.airoport.backend.repository.AeroportRepository;
import com.airoport.backend.repository.CampagnyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AeroportService {

    private final AeroportRepository aeroportRepository;

    public AeroportService(AeroportRepository aeroportRepository) {
        this.aeroportRepository = aeroportRepository;
    }

    public List<Aeroport> getAeroportByIName(String name) {
        try {
            Optional<List<Aeroport>> optionalList = Optional.ofNullable(aeroportRepository.findByNameContainingIgnoreCase(name));

            if (optionalList.isPresent() && !optionalList.get().isEmpty()) {
                return optionalList.get();
            } else {
                throw new IllegalArgumentException("Aucune aeroport trouvée avec le nom : " + name);
            }

        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Erreur interne lors de la recherche", e);
        }
    }
    public List<Aeroport> getdAll() {
        return aeroportRepository.findAll();
    }

    public Aeroport createAeroport(AeroportDTO aeroportDTO) {
        Aeroport aeroport=new Aeroport();
        aeroport.setName(aeroportDTO.name);
        return aeroportRepository.save(aeroport);
    }

    public Aeroport updateAeroport(AeroportDTO aeroportDTO, int id) {
        Aeroport aeroport = aeroportRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("AeroportDTO non trouvée avec id: " + id));

        aeroport.setName(aeroportDTO.name);

        return aeroportRepository.save(aeroport);
    }

    public void deleteAeroport(int id) {
        aeroportRepository.deleteById(id);

    }
}
