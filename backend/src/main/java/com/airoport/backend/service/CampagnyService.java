package com.airoport.backend.service;


import com.airoport.backend.dto.CampagnyDTO;
import com.airoport.backend.model.Campagny;
import com.airoport.backend.repository.CampagnyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CampagnyService {


    private final CampagnyRepository campagnyRepository;

    public CampagnyService(CampagnyRepository campagnyRepository) {
        this.campagnyRepository = campagnyRepository;
    }

    public List<Campagny> getCampagnyByIName(String name) {
        try {
             Optional<List<Campagny>> optionalList = Optional.ofNullable(campagnyRepository.findByNameContainingIgnoreCase(name));

            if (optionalList.isPresent() && !optionalList.get().isEmpty()) {
                return optionalList.get();
            } else {
                throw new IllegalArgumentException("Aucune compagnie trouvée avec le nom : " + name);
            }

        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Erreur interne lors de la recherche", e);
        }
    }
    public List<Campagny> getdAll() {
        return campagnyRepository.findAll();
    }

    public Campagny createCampagny(CampagnyDTO campagnyDTO) {
        Campagny campagny=new Campagny();
        campagny.setNom(campagnyDTO.name);
        return campagnyRepository.save(campagny);
    }

    public Campagny updateCampagny(CampagnyDTO campagnyDTO, int id) {
        Campagny campagny = campagnyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Campagny non trouvée avec id: " + id));

        campagny.setNom(campagnyDTO.name);

        return campagnyRepository.save(campagny);
    }

    public void deleteCampagny(int id) {
        campagnyRepository.deleteById(id);

    }

}
