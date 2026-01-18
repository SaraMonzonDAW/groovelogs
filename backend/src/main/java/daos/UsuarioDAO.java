package daos;

import connection.MySqlConnection;
import models.Usuario;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UsuarioDAO {

    public boolean emailExists(String email) {
        MySqlConnection con = new MySqlConnection("GROOVELOGS");
        con.open();

        String sql = "SELECT email FROM usuarios WHERE email = '" + email + "'";
        ResultSet rs = con.executeSelect(sql);

        try {
            if (rs != null && rs.next()) {
                con.close();
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        con.close();
        return false;
    }

    public boolean insertUsuario(Usuario usuario) {
        MySqlConnection con = new MySqlConnection("GROOVELOGS");
        con.open();
        
        if (con.isError()) {
            System.out.println("ERROR CONEXIÓN: " + con.msgError());
        }


        String sql = "INSERT INTO usuarios (nombre, email, password) VALUES (" +
                     "'" + usuario.getNombre() + "'," +
                     "'" + usuario.getEmail() + "'," +
                     "'" + usuario.getPassword() + "')";

        ResultSet rs = con.executeInsert(sql);
        if (con.isError()) {
            System.out.println("ERROR SQL: " + con.msgError());
        }

        boolean ok = rs != null && !con.isError();

        con.close();
        return ok;
    }
}
