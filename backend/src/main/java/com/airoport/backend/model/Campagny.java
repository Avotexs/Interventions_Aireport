

package com.airoport.backend.model;

import jakarta.persistence.*;


@Entity

public class Campagny {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(nullable = false, unique = true)

    String name;

    public Campagny( String name) {

        this.name = name;
    }

    public Campagny() {

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return this.id;
    }


}
