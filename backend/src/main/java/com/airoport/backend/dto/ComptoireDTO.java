package com.airoport.backend.dto;

public class ComptoireDTO {
    public int id;
    public String nom;
    public int zoneId;   // ID de la zone associée

    public ComptoireDTO() { }
    public ComptoireDTO(String nom, int zoneId) {
        this.nom = nom;
        this.zoneId = zoneId;
    }
}
