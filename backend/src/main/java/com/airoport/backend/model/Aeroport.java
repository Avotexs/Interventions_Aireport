package com.airoport.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
public class Aeroport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "aeroport", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Technicien> techniciens = new ArrayList<>();

    public Aeroport() {}

    public Aeroport(String name) {
        this.name = name;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<Technicien> getTechniciens() { return techniciens; }
    public void setTechniciens(List<Technicien> techniciens) { this.techniciens = techniciens; }
}
