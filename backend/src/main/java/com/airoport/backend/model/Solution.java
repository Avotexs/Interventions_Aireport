package com.airoport.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Solution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(nullable = false, unique = true, length = 288)
    String name;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public Solution(String name) {
        this.name = name;
        this.createdAt = LocalDateTime.now();
    }

    public Solution() {
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
