package com.groovelogs.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.groovelogs.entities.Usuario;
import com.groovelogs.services.UsuarioService;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {


private final UsuarioService usuarioService;


public AuthController(UsuarioService usuarioService) {
this.usuarioService = usuarioService;
}


@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody Usuario usuario) {


if (usuarioService.emailExists(usuario.getEmail())) {
return ResponseEntity
.status(HttpStatus.CONFLICT)
.body("El email ya está registrado");
}


Usuario creado = usuarioService.crearUsuario(usuario);


return ResponseEntity
.status(HttpStatus.CREATED)
.body(creado);
}
}
