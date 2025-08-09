package com.airoport.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
public class Technicien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String firstname;
    private String lastname;
    private String pseudoname;
    private String role;
    private String motDePass;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "aeroport_id", nullable = false)
    @JsonBackReference
    private Aeroport aeroport;

    public Technicien() {}

    public Technicien(String firstname, String lastname, String pseudoname, String role, String motDePass, Aeroport aeroport) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.pseudoname = pseudoname;
        this.role = role;
        this.motDePass = motDePass;
        this.aeroport = aeroport;
    }

    // Getters et setters
    public int getId() { return id; }

    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getPseudoname() { return pseudoname; }
    public void setPseudoname(String pseudoname) { this.pseudoname = pseudoname; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getMotDePass() { return motDePass; }
    public void setMotDePass(String motDePass) { this.motDePass = motDePass; }

    public Aeroport getAeroport() { return aeroport; }
    public void setAeroport(Aeroport aeroport) { this.aeroport = aeroport; }

    // Propriété JSON derived pour compatibilité frontend
    @JsonProperty("aeroportId")
    public Integer getAeroportId() {
        return aeroport != null ? aeroport.getId() : null;
    }

    // Méthodes métier (à implémenter si nécessaire)
    public void AjouterIntervention() {
        // À implémenter selon ton modèle
    }

    public void AfficherHistoriqueIntervention() {
        // À implémenter selon ton modèle
    }
}