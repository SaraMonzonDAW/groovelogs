package com.groovelogs.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.groovelogs.entities.Rating;
import com.groovelogs.entities.Usuario;
import com.groovelogs.services.RatingService;
import com.groovelogs.services.UsuarioService;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    private final RatingService ratingService;
    private final UsuarioService usuarioService;

    public RatingController(
        RatingService ratingService,
        UsuarioService usuarioService
    ) {
        this.ratingService = ratingService;
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public Rating puntuar(
        Authentication authentication,
        @RequestBody Rating rating
    ) {
        Usuario usuario =
            usuarioService.buscarPorEmail(authentication.getName());
        return ratingService.guardarRating(usuario, rating);
    }

    @GetMapping("/me")
    public Rating miRating(
        Authentication authentication,
        @RequestParam Long discogsId,
        @RequestParam String tipo
    ) {
        Usuario usuario =
            usuarioService.buscarPorEmail(authentication.getName());

        return ratingService
            .ratingDeUsuario(usuario, discogsId, tipo)
            .orElse(null);
    }

    @GetMapping("/media")
    public Map<String, Double> media(
        @RequestParam Long discogsId,
        @RequestParam String tipo
    ) {
        double media = ratingService.media(discogsId, tipo);
        return Map.of("media", media);
    }
}

