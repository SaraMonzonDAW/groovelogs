package com.groovelogs.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.groovelogs.entities.Rating;
import com.groovelogs.entities.Usuario;
import com.groovelogs.repositories.RatingRepository;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;

    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    public Rating guardarRating(Usuario usuario, Rating rating) {
        Rating r = ratingRepository
            .findByUsuarioAndDiscogsIdAndTipo(
                usuario,
                rating.getDiscogsId(),
                rating.getTipo()
            )
            .orElse(new Rating());

        r.setUsuario(usuario);
        r.setDiscogsId(rating.getDiscogsId());
        r.setTipo(rating.getTipo());
        r.setPuntuacion(rating.getPuntuacion());

        return ratingRepository.save(r);
    }

    public List<Rating> ratingsDeUsuario(Usuario usuario) {
        return ratingRepository.findByUsuario(usuario);
    }

    public double media(Long discogsId, String tipo) {
        return ratingRepository
            .findByDiscogsIdAndTipo(discogsId, tipo)
            .stream()
            .mapToInt(Rating::getPuntuacion)
            .average()
            .orElse(0);
    }
    
    public Optional<Rating> ratingDeUsuario(
    	    Usuario usuario,
    	    Long discogsId,
    	    String tipo
    	) {
    	    return ratingRepository.findByUsuarioAndDiscogsIdAndTipo(
    	        usuario,
    	        discogsId,
    	        tipo
    	    );
    	}

}

