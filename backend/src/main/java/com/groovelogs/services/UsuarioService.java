package com.groovelogs.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.groovelogs.entities.Usuario;
import com.groovelogs.repositories.UsuarioRepository;

@Service
@Transactional
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UsuarioService(
        UsuarioRepository usuarioRepository,
        BCryptPasswordEncoder passwordEncoder
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean emailExists(String email) {
        return usuarioRepository
            .existsByEmailAndDeletedAtIsNull(email);
    }

    public Usuario crearUsuario(Usuario usuario) {

        String passwordCifrada =
            passwordEncoder.encode(usuario.getPassword());

        usuario.setPassword(passwordCifrada);
        usuario.setPrivacyAcceptedAt(LocalDateTime.now());

        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository
            .findByEmailAndDeletedAtIsNull(email)
            .orElseThrow(() ->
                new RuntimeException("Usuario no encontrado")
            );
    }
    
    public Usuario actualizarPerfil(String email, Usuario datos) {

        Usuario u = buscarPorEmail(email);

        if (datos.getNombre() != null)
            u.setNombre(datos.getNombre());

        if (datos.getApellidos() != null)
            u.setApellidos(datos.getApellidos());

        if (datos.getDisplayName() != null)
            u.setDisplayName(datos.getDisplayName());

        if (datos.getFavoriteArtist() != null)
            u.setFavoriteArtist(datos.getFavoriteArtist());

        return usuarioRepository.save(u);
    }

    public void eliminarUsuario(String email) {
        Usuario usuario = buscarPorEmail(email);
        usuario.setDeletedAt(LocalDateTime.now());
        usuarioRepository.save(usuario);
    }
    
    public void eliminarUsuarioPorId(Long id) {
        Usuario usuario = usuarioRepository
            .findById(id)
            .orElseThrow();

        usuario.setDeletedAt(LocalDateTime.now());
        usuarioRepository.save(usuario);
    }


    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }
}
