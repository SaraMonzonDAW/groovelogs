package controllers;

import daos.UsuarioDAO;
import models.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UsuarioDAO usuarioDAO = new UsuarioDAO();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
    	
        System.out.println(">>> ENTRO EN REGISTER <<<");


        if (usuarioDAO.emailExists(usuario.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("El email ya está registrado");
        }

        boolean created = usuarioDAO.insertUsuario(usuario);

        if (!created) {
            return ResponseEntity
                    .internalServerError()
                    .body("Error al crear el usuario");
        }

        return ResponseEntity.ok("Usuario creado correctamente");
    }
}

