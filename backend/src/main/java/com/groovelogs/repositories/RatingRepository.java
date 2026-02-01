package com.groovelogs.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.groovelogs.entities.Rating;
import com.groovelogs.entities.Usuario;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    Optional<Rating> findByUsuarioAndDiscogsIdAndTipo(
        Usuario usuario,
        Long discogsId,
        String tipo
    );

    List<Rating> findByUsuario(Usuario usuario);

    List<Rating> findByDiscogsIdAndTipo(Long discogsId, String tipo);
    
}

