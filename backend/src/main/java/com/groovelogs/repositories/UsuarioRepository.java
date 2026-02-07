package com.groovelogs.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.groovelogs.entities.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsByEmailAndDeletedAtIsNull(String email);

    Optional<Usuario> findByEmailAndDeletedAtIsNull(String email);
}