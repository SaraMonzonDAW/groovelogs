package connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class MySqlConnection {
	private String host = "localhost";
	private String puerto = "3306";
	private String nameDB = "GROOVELOGS";
	private String usuario = "root";
	private String password = "1234";
	
	private boolean autocomit;
	
	private boolean flagError;
	private String msgError;
	private Connection connection;
	
	private void _initialize() {
		this.flagError = false;
		this.msgError = "";
		this.connection = null;
	}
	
	private void _initializeError() {
		this.flagError = false;
		this.msgError = "";
	}
	
	public MySqlConnection()
	{
		this._initialize();
		this.autocomit = true;
	}
	
	public MySqlConnection(boolean _autocomit)
	{
		this._initialize();
		this.autocomit = _autocomit;
	}
	
	public MySqlConnection(String _nameDB)
	{
		this._initialize();
		this.nameDB = _nameDB;
		this.autocomit = true;
	}
	
	public MySqlConnection(String _nameDB, boolean _autocomit)
	{
		this._initialize();
		this.nameDB = _nameDB;
		this.autocomit = _autocomit;
	}
	
	public MySqlConnection(String _host, String _puerto, String _nameDB, String _usuario, String _password)
	{
		this._initialize();
		this.host = _host;
		this.puerto = _puerto;
		this.nameDB = _nameDB;
		this.usuario = _usuario;
		this.password = _password;
		this.autocomit = true;
	}
	
	public MySqlConnection(String _host, String _puerto, String _nameDB, String _usuario, String _password, boolean _autocomit)
	{
		this._initialize();
		this.host = _host;
		this.puerto = _puerto;
		this.nameDB = _nameDB;
		this.usuario = _usuario;
		this.password = _password;
		this.autocomit = _autocomit;
	}
	
	public void open()
	{
		try
		{   
			this._initializeError();
			
			if ((this.connection == null) || ((this.connection != null) && (this.connection.isClosed())))
			{
			  
			  Class.forName("com.mysql.cj.jdbc.Driver");
			  this.connection = DriverManager.getConnection(
					    "jdbc:mysql://" + this.host + ":" + this.puerto + "/" + this.nameDB
					    + "?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true",
					    this.usuario,
					    this.password
					);
			  this.connection.setAutoCommit(this.autocomit);
			}
		}
		catch (ClassNotFoundException ex)
		{
			this.flagError = true;
			this.msgError = "Error al registrar el dricer. +Info: " + ex.getMessage();
		}
		catch (Exception ex)
		{
			this.flagError = true;
			this.msgError = "Error en Open. +Info: " + ex.getMessage();
		}
	}
	
	public void close()
	{
		try
		{   this._initializeError();
			if ((this.connection != null) && (!this.connection.isClosed()))
			   this.connection.close();
		}
		catch (SQLException ex)
		{
			this.flagError = true;
			this.msgError = "Error en close. +Info: " + ex.getMessage();
		}
		
	}
	
	public ResultSet executeSelect(String _sql)
	{
		try {   
			this._initializeError();
			if (this.connection != null) {
				if (!this.connection.isClosed()) {
					java.sql.Statement objStament = this.connection.createStatement();	
					ResultSet rs = objStament.executeQuery (_sql);
					return rs;
				}
				else {
					this.flagError = true;
					this.msgError = "Error en ExecuteSelect. +Info: Conexión cerrada.";
				}
			}
			else {
				this.flagError = true;
				this.msgError = "Error en ExecuteSelect. +Info: Conexión no inicializada.";
			}
		}
		catch (SQLException ex) {
			this.flagError = true;
			this.msgError = "Error en ExecuteSelect. +Info: " + ex.getMessage();
		}

		
		   try {
				 if ((this.flagError) && (!this.connection.getAutoCommit())) {
						this.connection.rollback();
				}
			} catch (SQLException ex) {
				this.flagError = true;
				this.msgError = "Error en intento de rollback en ExecuteSelect. +Info: " + ex.getMessage();
			}
			
		
		return null; 
	}
	
	public ResultSet executeInsert(String _sql) {
		
		try {   
			 this._initializeError();
			 if (this.connection != null) {
				if (!this.connection.isClosed()) {
					PreparedStatement objStament = this.connection.prepareStatement(_sql,Statement.RETURN_GENERATED_KEYS);	
					objStament.execute();
					ResultSet rs = objStament.getGeneratedKeys();
					return rs;
				}
				else {
					this.flagError = true;
					this.msgError = "Error en ExecuteQuery. +Info: Conexión cerrada.";
				}
			 }
			 else {
				this.flagError = true;
				this.msgError = "Error en ExecuteQuery. +Info: Conexión no inicializada.";
			}
		   }
		   catch (SQLException ex) {
			    this.flagError = true;
			    this.msgError = "Error en ExecuteQuery. +Info: " + ex.getMessage();
		   }
		
		   try {
				 if ((this.flagError) && (!this.connection.getAutoCommit())) {
						this.connection.rollback();
				}
			} catch (SQLException ex) {
				this.flagError = true;
				this.msgError = "Error en intento de rollback en ExecuteQuery. +Info: " + ex.getMessage();
			}
		
		return null; 
	}
	
	public int executeUpdateOrDelete(String _sql) {
		int NumRows = 0;
		try {   
			 this._initializeError();
			 if (this.connection != null) {
				if (!this.connection.isClosed()) {
					PreparedStatement objStament = this.connection.prepareStatement(_sql);	
					NumRows = objStament.executeUpdate();
				}
				else {
					this.flagError = true;
					this.msgError = "Error en executeUpdateOrDelete. +Info: Conexión cerrada.";
				}
			 }
			 else {
				this.flagError = true;
				this.msgError = "Error en executeUpdateOrDelete. +Info: Conexión no inicializada.";
			}
		   }
		   catch (SQLException ex) {
			    this.flagError = true;
			    this.msgError = "Error en executeUpdateOrDelete. +Info: " + ex.getMessage();
		   }
		
		   try {
				 if ((this.flagError) && (!this.connection.getAutoCommit())) {
						this.connection.rollback();
				}
			} catch (SQLException ex) {
				this.flagError = true;
				this.msgError = "Error en intento de rollback en executeUpdateOrDelete. +Info: " + ex.getMessage();
			}
		
		return NumRows;
	}
	
	public void commit()
	{
		try
		{   this._initializeError();
			if (!this.connection.getAutoCommit()) {
			   this.connection.commit();
			}
		}
		catch (SQLException ex)
		{
			this.flagError = true;
			this.msgError = "Error en commit. +Info: " + ex.getMessage();
		}
	}
	
	public void rollback()
	{
		try
		{   this._initializeError();
			if (!this.connection.getAutoCommit()) {
			   this.connection.rollback();
			}
		}
		catch (SQLException ex)
		{
			this.flagError = true;
			this.msgError = "Error en rollback. +Info: " + ex.getMessage();
		}
	}
	
	public boolean isError() {
		return this.flagError;
	}
	
	public String msgError() {
		return this.msgError;
	}

}
