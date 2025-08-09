package com.airoport.backend.model;

import jakarta.persistence.*;
import org.springframework.lang.Nullable;

import javax.annotation.processing.Generated;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Equipement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,unique = true)
    private String nameEquipement;
    @Column(nullable = false)
    private int quantite;

    public Equipement(String nameEquipement, int quantite) {
        this.nameEquipement = nameEquipement;
        this.quantite = quantite;
    }

    public Equipement() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameEquipement() {
        return nameEquipement;
    }

    public void setNameEquipement(String nameEquipement) {
        this.nameEquipement = nameEquipement;
    }

    public int getQuantite() {
        return quantite;
    }

    public void setQuantite(int quantite) {
        this.quantite = quantite;
    }
}
