package com.airoport.backend.dto;

public class TechnicienDTO {
    public int id;
    public String firstname;
    public String lastname;
    public String pseudoname;
    public String role;
    public String motDePass;
    public int aeroportId; // id de l'aéroport

    public TechnicienDTO() {}

    public TechnicienDTO(String firstname, String lastname, String pseudoname, String role, String motDePass, int aeroportId) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.pseudoname = pseudoname;
        this.role = role;
        this.motDePass = motDePass;
        this.aeroportId = aeroportId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPseudoname() {
        return pseudoname;
    }

    public void setPseudoname(String pseudoname) {
        this.pseudoname = pseudoname;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMotDePass() {
        return motDePass;
    }

    public void setMotDePass(String motDePass) {
        this.motDePass = motDePass;
    }

    public int getAeroportId() {
        return aeroportId;
    }

    public void setAeroportId(int aeroportId) {
        this.aeroportId = aeroportId;
    }
}
