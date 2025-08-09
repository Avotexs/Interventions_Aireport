package com.airoport.backend.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ProjetEquipement> projetEquipements = new HashSet<>();

    public Project(String name, Set<ProjetEquipement> projetEquipements) {
        this.name = name;
        this.projetEquipements = projetEquipements;
    }

    public Project() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ProjetEquipement> getProjetEquipements() {
        return projetEquipements;
    }

    public void setProjetEquipements(Set<ProjetEquipement> projetEquipements) {
        this.projetEquipements = projetEquipements;
    }
}
