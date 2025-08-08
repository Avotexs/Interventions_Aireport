package com.airoport.backend.model;

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

    @Column(name = "aeroport_id", nullable = false)
    private int aeroportId; // Remplace la relation ManyToOne par un simple ID

    public Technicien() {}

    public Technicien(String firstname, String lastname, String pseudoname, String role, String motDePass, int aeroport) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.pseudoname = pseudoname;
        this.role = role;
        this.motDePass = motDePass;
        this.aeroportId= aeroport;
    }

    // Getters et setters pour tous les champs
    public int getId() { return id; }
    public String getFirstname() { return firstname; }
    public void setfirstName(String firstname) { this.firstname = firstname; }
    public String getLastname() { return lastname; }
    public void setLastname(String lastename) { this.lastname = lastname; }
    public String getPseudoname() { return pseudoname; }
    public void setPseudoname(String pseudoname) { this.pseudoname = pseudoname; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getMotDePass() { return motDePass; }
    public void setMotDePass(String motDePass) { this.motDePass = motDePass; }

    public int getAeroportId() { return aeroportId; }
    public void setAeroportId(int aeroportid) { this.aeroportId = aeroportId; }

    // Ajoute tes méthodes métier ici
    public void AjouterIntervention() {
        // À implémenter selon ton modèle
    }

    public void AfficherHistoriqueIntervention() {
        // À implémenter selon ton modèle
    }
}