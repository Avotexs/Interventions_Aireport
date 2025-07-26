package com.airoport.backend.dto;

    public class CampagnyDTO {
        public int id;      // ← Donnée à envoyer/recevoir
        public String name;  // ← Donnée à envoyer/recevoir

        // Constructeur vide
        public CampagnyDTO() {}

        // Constructeur avec paramètres
        public CampagnyDTO(String name) {

            this.name = name;
        }
    }

