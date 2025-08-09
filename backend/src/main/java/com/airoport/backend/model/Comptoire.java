package com.airoport.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class Comptoire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nom;

    /* plusieure contoire  vers 1 Zone */
    @ManyToOne
    @JoinColumn(name = "zone_id")
    @JsonBackReference
    private Zone zone;

    public Comptoire() { }

    public Comptoire(String nom, Zone zone) {
        this.nom = nom;
        this.zone = zone;
    }

    /* Getters & Setters */
    public int getId() { return id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public Zone getZone() { return zone; }
    public void setZone(Zone zone) { this.zone = zone; }
}
