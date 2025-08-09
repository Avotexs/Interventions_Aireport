package com.airoport.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class ProjetEquipement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "projet_id")
    @JsonBackReference  // <-- ici, c'est @JsonBackReference, pas JsonManagedReference
    private Project projet;

    @ManyToOne
    @JoinColumn(name = "equipement_id")
// pas d'annotation JsonManagedReference ici, laisse simple
    private Equipement equipement;


    private int quantiteReservee;

    public ProjetEquipement(Project projet, Equipement equipement, int quantiteReservee) {
        this.projet = projet;
        this.equipement = equipement;
        this.quantiteReservee = quantiteReservee;
    }

    public ProjetEquipement() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Project getProjet() {
        return projet;
    }

    public void setProjet(Project projet) {
        this.projet = projet;
    }

    public Equipement getEquipement() {
        return equipement;
    }

    public void setEquipement(Equipement equipement) {
        this.equipement = equipement;
    }

    public int getQuantiteReservee() {
        return quantiteReservee;
    }

    public void setQuantiteReservee(int quantiteReservee) {
        this.quantiteReservee = quantiteReservee;
    }
}

