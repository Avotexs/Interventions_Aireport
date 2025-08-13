package com.airoport.backend.dto;
import java.util.Date;
public class InterventionDTO {
    private int id;
    private long numero;
    private Date date;
    private Date dateDebut;
    private Date dateFin;
    private String duration;
    private boolean inProgress;
    private int entrepriseId;
    private int zoneId;
    private int comptoireId;
    private int solutionId;
    private int problemId;
    private int aeroportId;
    private Long projetId;
    private int technicienId;

    public InterventionDTO() {}

    public InterventionDTO(int id, long numero, Date date, Date dateDebut, Date dateFin, String duration,
                           boolean inProgress, int entrepriseId, int zoneId, int comptoireId, int solutionId,
                           int problemId, int aeroportId, Long projetId, int technicienId) {
        this.id = id;
        this.numero = numero;
        this.date = date;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.duration = duration;
        this.inProgress = inProgress;
        this.entrepriseId = entrepriseId;
        this.zoneId = zoneId;
        this.comptoireId = comptoireId;
        this.solutionId = solutionId;
        this.problemId = problemId;
        this.aeroportId = aeroportId;
        this.projetId = projetId;
        this.technicienId = technicienId;
    }

    public int getId() {
        return id;
    }

    public long getNumero() {
        return numero;
    }

    public Date getDate() {
        return date;
    }

    public Date getDateDebut() {
        return dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public String getDuration() {
        return duration;
    }

    public boolean isInProgress() {
        return inProgress;
    }

    public int getEntrepriseId() {
        return entrepriseId;
    }

    public int getZoneId() {
        return zoneId;
    }

    public int getComptoireId() {
        return comptoireId;
    }

    public int getSolutionId() {
        return solutionId;
    }

    public int getProblemId() {
        return problemId;
    }

    public int getAeroportId() {
        return aeroportId;
    }

    public Long getProjetId() {
        return projetId;
    }
    
    public int getTechnicienId() {
        return technicienId;
    }

    public void setId(int id) {
        this.id = id;
    }
    public void setNumero(long numero) {
        this.numero = numero;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }
    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }
    public void setDuration(String duration) {
        this.duration = duration;
    }
    public void setInProgress(boolean inProgress) {
        this.inProgress = inProgress;
    }
    public void setEntrepriseId(int entrepriseId) {
        this.entrepriseId = entrepriseId;
    }
    public void setZoneId(int zoneId) {
        this.zoneId = zoneId;
    }
    public void setComptoireId(int comptoireId) {
        this.comptoireId = comptoireId;
    }
    public void setSolutionId(int solutionId) {
        this.solutionId = solutionId;
    }
    public void setProblemId(int problemId) {
        this.problemId = problemId;
    }
    public void setAeroportId(int aeroportId) {
        this.aeroportId = aeroportId;
    }
    public void setProjetId(Long projetId) {
        this.projetId = projetId;
    }
    

    public void setTechnicienId(int technicienId) {
        this.technicienId = technicienId;
    }

}
