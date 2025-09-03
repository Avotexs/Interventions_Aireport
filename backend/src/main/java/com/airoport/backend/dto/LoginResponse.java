package com.airoport.backend.dto;

public class LoginResponse {
    public int id;
    public String role;
    public String firstname;
    public String lastname;
    public Integer aeroportId;
    public String token; // simple token côté client (UUID)
    public LoginResponse(int id, String role, String firstname, String lastname, Integer aeroportId, String token) {
        this.id = id;
        this.role = role;
        this.firstname = firstname;
        this.lastname = lastname;
        this.aeroportId = aeroportId;
        this.token = token;
    }
}
