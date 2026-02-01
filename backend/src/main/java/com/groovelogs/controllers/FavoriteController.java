package com.groovelogs.controllers;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.groovelogs.entities.Favorito;
import com.groovelogs.entities.Usuario;
import com.groovelogs.services.FavoriteService;
import com.groovelogs.services.UsuarioService;

@RestController
@RequestMapping("/api/favoritos")
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final UsuarioService usuarioService;

    public FavoriteController(
        FavoriteService favoriteService,
        UsuarioService usuarioService
    ) {
        this.favoriteService = favoriteService;
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Favorito> listar(Authentication authentication) {
        Usuario usuario =
            usuarioService.buscarPorEmail(authentication.getName());
        return favoriteService.obtenerFavoritos(usuario);
    }

    @PostMapping
    public Favorito guardar(
        Authentication authentication,
        @RequestBody Favorito favorito
    ) {
        Usuario usuario =
            usuarioService.buscarPorEmail(authentication.getName());
        return favoriteService.guardarFavorito(usuario, favorito);
    }

    @DeleteMapping
    public void eliminar(
        Authentication authentication,
        @RequestParam Long discogsId,
        @RequestParam String tipo
    ) {
        Usuario usuario =
            usuarioService.buscarPorEmail(authentication.getName());
        favoriteService.eliminarFavorito(usuario, discogsId, tipo);
    }
}
