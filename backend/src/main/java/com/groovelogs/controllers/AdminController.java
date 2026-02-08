package com.groovelogs.controllers;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.groovelogs.entities.Usuario;
import com.groovelogs.services.UsuarioService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UsuarioService usuarioService;

    public AdminController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/usuarios")
    public List<Usuario> listarUsuarios() {
        return usuarioService.obtenerTodos();
    }

    @DeleteMapping("/usuarios/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuarioPorId(id);
    }


    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/usuarios/me")
    public void eliminarMiCuenta(Authentication authentication) {
        String email = authentication.getName();
        usuarioService.eliminarUsuario(email);
    }
    
    @GetMapping("/debug")
    public String debug(Authentication auth) {
        return auth.getAuthorities().toString();
    }

    
}

