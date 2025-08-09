package com.airoport.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Zone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String nom;

    // 1 Zone  -> 0..* Comptoires
    @OneToMany(mappedBy = "zone", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Comptoire> comptoires;

    public Zone() { }

    public Zone(String nom) { this.nom = nom; }

    /* Getters & Setters */
    public int getId() { return id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public List<Comptoire> getComptoires() { return comptoires; }
    public void setComptoires(List<Comptoire> comptoires) { this.comptoires = comptoires; }
}
