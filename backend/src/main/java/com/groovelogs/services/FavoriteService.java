package com.groovelogs.services;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import org.springframework.stereotype.Service;

import com.groovelogs.entities.Favorito;
import com.groovelogs.entities.Usuario;
import com.groovelogs.repositories.FavoriteRepository;
@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }
    @Transactional
    public Favorito guardarFavorito(Usuario usuario, Favorito favorito) {

        favoriteRepository
            .findByUsuarioAndDiscogsIdAndTipo(
                usuario,
                favorito.getDiscogsId(),
                favorito.getTipo()
            )
            .ifPresent(f -> {
                throw new RuntimeException("Ya es favorito");
            });

        favorito.setUsuario(usuario);
        return favoriteRepository.save(favorito);
    }

    public List<Favorito> obtenerFavoritos(Usuario usuario) {
        return favoriteRepository.findByUsuario(usuario);
    }

    @Transactional
    public void eliminarFavorito(
        Usuario usuario,
        Long discogsId,
        String tipo
    ) {
        Favorito f = favoriteRepository
            .findByUsuarioAndDiscogsIdAndTipo(usuario, discogsId, tipo)
            .orElseThrow();

        favoriteRepository.delete(f);
    }
}

