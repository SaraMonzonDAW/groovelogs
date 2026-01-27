package com.groovelogs.controllers;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.groovelogs.entities.Usuario;
import com.groovelogs.services.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> listar() {
        return usuarioService.obtenerTodos();
    }

    @GetMapping("/me")
    public Usuario obtenerPerfil(Authentication authentication) {
        String email = authentication.getName();
        return usuarioService.buscarPorEmail(email);
    }

    @PutMapping("/me")
    public Usuario actualizarPerfil(
    Authentication authentication,
    @RequestBody Usuario datos
    ) {
    System.out.println("DATOS RECIBIDOS:");
    System.out.println("Nombre: " + datos.getNombre());
    System.out.println("Apellidos: " + datos.getApellidos());
    System.out.println("Bio: " + datos.getBio());


    String email = authentication.getName();
    return usuarioService.actualizarPerfil(email, datos);
    }
}