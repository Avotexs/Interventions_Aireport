package com.airoport.backend.model;


import jakarta.persistence.*;
import java.util.Date;
@Entity
public class Intervention {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private long numero;

    @Temporal(TemporalType.DATE)
    private Date date;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateDebut;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateFin;

    private String duration;

    @ManyToOne
    @JoinColumn(name = "entreprise_id")
    private Campagny entreprise; // You can rename to Entreprise if your entity is named so

    @ManyToOne
    @JoinColumn(name = "zone_id")
    private Zone zone;

    @ManyToOne
    @JoinColumn(name = "comptoire_id")
    private Comptoire comptoire;

    private boolean inProgress;

    @ManyToOne
    @JoinColumn(name = "solution_id")
    private Solution solution;

    @ManyToOne
    @JoinColumn(name = "problem_id")
    private Problem probleme;

    @ManyToOne
    @JoinColumn(name = "aeroport_id")
    private Aeroport aeroport;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project projet;

    @ManyToOne
    @JoinColumn(name = "technicien_id")
    private Technicien technicien;

    public Intervention() {}

    @PrePersist
    @PreUpdate
    private void updateInProgress() {
        this.inProgress = (this.dateFin == null);
    }

    // Getters and Setters

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public long getNumero() { return numero; }
    public void setNumero(long numero) { this.numero = numero; }

    public Date getDate() { return date; }
    public void setDate(Date date) { this.date = date; }

    public Date getDateDebut() { return dateDebut; }
    public void setDateDebut(Date dateDebut) { this.dateDebut = dateDebut; }

    public Date getDateFin() { return dateFin; }
    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
        updateInProgress();
    }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public Campagny getEntreprise() { return entreprise; }
    public void setEntreprise(Campagny entreprise) { this.entreprise = entreprise; }

    public Zone getZone() { return zone; }
    public void setZone(Zone zone) { this.zone = zone; }

    public Comptoire getComptoire() { return comptoire; }
    public void setComptoire(Comptoire comptoire) { this.comptoire = comptoire; }

    public boolean isInProgress() { return inProgress; }
    public void setInProgress(boolean inProgress) { this.inProgress = inProgress; }

    public Solution getSolution() { return solution; }
    public void setSolution(Solution solution) { this.solution = solution; }

    public Problem getProbleme() { return probleme; }
    public void setProbleme(Problem probleme) { this.probleme = probleme; }

    public Aeroport getAeroport() { return aeroport; }
    public void setAeroport(Aeroport aeroport) { this.aeroport = aeroport; }

    public Project getProjet() { return projet; }
    public void setProjet(Project projet) { this.projet = projet; }

    public Technicien getTechnicien() { return technicien; }
    public void setTechnicien(Technicien technicien) { this.technicien = technicien; }

    // Operations

    public static String CalculeDuration(Date dateDebut, Date dateFin) {
        if (dateDebut == null || dateFin == null) return null;
        long diffMillis = dateFin.getTime() - dateDebut.getTime();
        long seconds = diffMillis / 1000 % 60;
        long minutes = diffMillis / (1000 * 60) % 60;
        long hours = diffMillis / (1000 * 60 * 60) % 24;
        long days = diffMillis / (1000 * 60 * 60 * 24);
        return String.format("%d days, %02d:%02d:%02d", days, hours, minutes, seconds);
    }

    public static String ComproireZoneConcate(Comptoire comptoire, Zone zone) {
        String comptoireName = comptoire != null ? comptoire.getNom() : "";
        String zoneName = zone != null ? zone.getNom() : "";
        return comptoireName + " - " + zoneName;
    }
}
