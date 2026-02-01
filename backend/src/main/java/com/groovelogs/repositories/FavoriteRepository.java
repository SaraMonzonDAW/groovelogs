package com.groovelogs.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.groovelogs.entities.Favorito;
import com.groovelogs.entities.Usuario;

public interface FavoriteRepository extends JpaRepository<Favorito, Long> {

    List<Favorito> findByUsuario(Usuario usuario);

    Optional<Favorito> findByUsuarioAndDiscogsIdAndTipo(
        Usuario usuario,
        Long discogsId,
        String tipo
    );
}

