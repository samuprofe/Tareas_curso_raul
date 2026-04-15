package org.example.tareas33.service;

import lombok.RequiredArgsConstructor;
import org.example.tareas33.dto.auth.AuthResponse;
import org.example.tareas33.dto.auth.LoginRequest;
import org.example.tareas33.dto.auth.RegisterRequest;
import org.example.tareas33.entity.Usuario;
import org.example.tareas33.repository.UsuarioRepository;
import org.example.tareas33.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        validateRegisterRequest(request);
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El email ya esta registrado");
        }

        Usuario usuario = Usuario.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nombreCompleto(request.getNombreCompleto())
                .build();

        Usuario saved = usuarioRepository.save(usuario);
        String token = jwtService.generateToken(saved.getEmail());
        return toAuthResponse(saved, token);
    }

    public AuthResponse login(LoginRequest request) {
        validateLoginRequest(request);
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciales invalidas"));

        String token = jwtService.generateToken(usuario.getEmail());
        return toAuthResponse(usuario, token);
    }

    private AuthResponse toAuthResponse(Usuario usuario, String token) {
        return AuthResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .userId(usuario.getId())
                .email(usuario.getEmail())
                .nombreCompleto(usuario.getNombreCompleto())
                .build();
    }

    private void validateRegisterRequest(RegisterRequest request) {
        if (request == null
                || isBlank(request.getEmail())
                || isBlank(request.getPassword())
                || isBlank(request.getNombreCompleto())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Datos de registro incompletos");
        }
    }

    private void validateLoginRequest(LoginRequest request) {
        if (request == null || isBlank(request.getEmail()) || isBlank(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Credenciales incompletas");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}


