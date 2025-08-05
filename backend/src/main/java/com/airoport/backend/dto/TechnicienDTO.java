package com.airoport.backend.dto;

public class TechnicienDTO {
    public int id;
    public String name;
    public String lastname;
    public String pseudoname;
    public String role;
    public String motDePass;
    public int aeroportId; // id de l'aéroport

    public TechnicienDTO() {}

    public TechnicienDTO(String name, String lastname, String pseudoname, String role, String motDePass, int aeroportId) {
        this.name = name;
        this.lastname = lastname;
        this.pseudoname = pseudoname;
        this.role = role;
        this.motDePass = motDePass;
        this.aeroportId = aeroportId;
    }
}
