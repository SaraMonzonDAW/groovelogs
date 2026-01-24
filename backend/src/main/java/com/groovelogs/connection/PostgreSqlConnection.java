package com.groovelogs.connection;

import java.sql.*;

public class PostgreSqlConnection {

    private String host = "localhost";
    private String puerto = "5432";
    private String nameDB = "groovelogs";
    private String usuario = "groovelogs_user";
    private String password = "1234";

    private boolean autocommit = true;
    private boolean flagError;
    private String msgError;
    private Connection connection;

    public void open() {
        try {
            flagError = false;
            msgError = "";

            if (connection == null || connection.isClosed()) {
                Class.forName("org.postgresql.Driver");
                connection = DriverManager.getConnection(
                        "jdbc:postgresql://" + host + ":" + puerto + "/" + nameDB,
                        usuario,
                        password
                );
                connection.setAutoCommit(autocommit);
            }
        } catch (Exception e) {
            flagError = true;
            msgError = "Error al abrir conexión: " + e.getMessage();
        }
    }

    public void close() {
        try {
            if (connection != null && !connection.isClosed())
                connection.close();
        } catch (SQLException e) {
            flagError = true;
            msgError = e.getMessage();
        }
    }

    public ResultSet executeSelect(String sql) throws SQLException {
        Statement st = connection.createStatement();
        return st.executeQuery(sql);
    }

    public ResultSet executeInsert(String sql) throws SQLException {
        PreparedStatement ps = connection.prepareStatement(
                sql,
                Statement.RETURN_GENERATED_KEYS
        );
        ps.execute();
        return ps.getGeneratedKeys();
    }

    public int executeUpdateOrDelete(String sql) throws SQLException {
        PreparedStatement ps = connection.prepareStatement(sql);
        return ps.executeUpdate();
    }

    public Connection getConnection() {
        return this.connection;
    }
} 