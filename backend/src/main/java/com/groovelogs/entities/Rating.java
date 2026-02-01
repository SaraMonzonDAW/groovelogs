package com.groovelogs.entities;

import jakarta.persistence.*;

@Entity
@Table(
    name = "ratings",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"usuario_id", "discogsId", "tipo"})
    }
)
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private Long discogsId;
    private String tipo;
    private int puntuacion;

    private String titulo;
    private String artista;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public Long getDiscogsId() {
		return discogsId;
	}
	public void setDiscogsId(Long discogsId) {
		this.discogsId = discogsId;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public int getPuntuacion() {
		return puntuacion;
	}
	public void setPuntuacion(int puntuacion) {
		this.puntuacion = puntuacion;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getArtista() {
		return artista;
	}
	public void setArtista(String artista) {
		this.artista = artista;
	}

}
