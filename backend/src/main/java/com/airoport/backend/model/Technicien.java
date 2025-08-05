package com.airoport.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity

public class Technicien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String lastname;
    private String pseudoname;
    private String role;
    private String motDePass;

    @ManyToOne
    @JoinColumn(name = "aeroport_id", nullable = false)
    @JsonBackReference
    private Aeroport aeroport;

    public Technicien() {}

    public Technicien(String name, String lastname, String pseudoname, String role, String motDePass, Aeroport aeroport) {
        this.name = name;
        this.lastname = lastname;
        this.pseudoname = pseudoname;
        this.role = role;
        this.motDePass = motDePass;
        this.aeroport = aeroport;
    }

    // Getters et setters pour tous les champs
    public int getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLastname() { return lastname; }
    public void setLastname(String lastename) { this.lastname = lastname; }
    public String getPseudoname() { return pseudoname; }
    public void setPseudoname(String pseudoname) { this.pseudoname = pseudoname; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getMotDePass() { return motDePass; }
    public void setMotDePass(String motDePass) { this.motDePass = motDePass; }
    public Aeroport getAeroport() { return aeroport; }
    public void setAeroport(Aeroport aeroport) { this.aeroport = aeroport; }

    // Ajoute tes méthodes métier ici
    public void AjouterIntervention() {
        // À implémenter selon ton modèle
    }

    public void AfficherHistoriqueIntervention() {
        // À implémenter selon ton modèle
    }
}
