package com.airoport.backend.dto;

public class LoginRequest {
    private String pseudoname;
    private String motDePass;
    public String getPseudoname() { return pseudoname; }
    public void setPseudoname(String pseudoname) { this.pseudoname = pseudoname; }
    public String getMotDePass() { return motDePass; }
    public void setMotDePass(String motDePass) { this.motDePass = motDePass; }
}
