package com.airoport.backend.service;

import com.airoport.backend.dto.LoginRequest;
import com.airoport.backend.dto.LoginResponse;
import com.airoport.backend.model.Technicien;
import com.airoport.backend.repository.TechnicienRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {
    private final TechnicienRepository technicienRepository;

    // "store" de sessions en mémoire: token -> userId
    private final ConcurrentHashMap<String, Integer> sessions = new ConcurrentHashMap<>();

    public AuthService(TechnicienRepository technicienRepository) {
        this.technicienRepository = technicienRepository;
    }

    public LoginResponse login(LoginRequest req) {
        Optional<Technicien> opt = technicienRepository.findByPseudoname(req.getPseudoname());
        if (opt.isEmpty()) throw new IllegalArgumentException("Pseudoname ou mot de passe invalide");

        Technicien t = opt.get();

        // NOTE: tu stockes en clair pour l’instant. En prod, hash (BCrypt).
        if (!t.getMotDePass().equals(req.getMotDePass())) {
            throw new IllegalArgumentException("Pseudoname ou mot de passe invalide");
        }

        String token = UUID.randomUUID().toString();
        sessions.put(token, t.getId());

        return new LoginResponse(
                t.getId(),
                t.getRole(),
                t.getFirstname(),
                t.getLastname(),
                t.getAeroport() != null ? t.getAeroport().getId() : null,
                token
        );
    }

    public void logout(String token) {
        if (token != null) sessions.remove(token);
    }

    public Integer getUserIdByToken(String token) {
        return token == null ? null : sessions.get(token);
    }
}
