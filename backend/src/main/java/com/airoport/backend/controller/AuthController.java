package com.airoport.backend.controller;

import com.airoport.backend.dto.LoginRequest;
import com.airoport.backend.dto.LoginResponse;
import com.airoport.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader(value="X-Auth-Token", required=false) String token) {
        authService.logout(token);
        return ResponseEntity.noContent().build();
    }
}
