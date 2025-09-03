package com.airoport.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Campagny {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(nullable = false, unique = true)
    String name;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public Campagny(String name) {
        this.name = name;
        this.createdAt = LocalDateTime.now();
    }

    public Campagny() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters et setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
