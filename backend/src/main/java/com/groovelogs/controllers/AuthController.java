package com.groovelogs.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import com.groovelogs.dto.LoginRequest;
import com.groovelogs.dto.LoginResponse;
import com.groovelogs.dto.RegisterRequest;
import com.groovelogs.entities.Usuario;
import com.groovelogs.security.JwtUtil;
import com.groovelogs.services.UsuarioService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioService usuarioService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(
            UsuarioService usuarioService,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil) {
        this.usuarioService = usuarioService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        if (usuarioService.emailExists(request.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("El email ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(request.getPassword());

        Usuario creado = usuarioService.crearUsuario(usuario);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(creado);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()));
        } catch (AuthenticationException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Email o contraseña incorrectos");
        }

        String token = jwtUtil.generateToken(request.getEmail());

        usuarioService.registrarLogin(request.getEmail());

        return ResponseEntity.ok(new LoginResponse(token));
    }

}
