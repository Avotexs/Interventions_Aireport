package com.airoport.backend.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Equipement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nameEquipement;
    private int quantiteTotal;

    public Equipement(String nameEquipement, int quantiteTotal) {
        this.nameEquipement = nameEquipement;
        this.quantiteTotal = quantiteTotal;
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

    public int getQuantiteTotal() {
        return quantiteTotal;
    }

    public void setQuantiteTotal(int quantiteTotal) {
        this.quantiteTotal = quantiteTotal;
    }
}
