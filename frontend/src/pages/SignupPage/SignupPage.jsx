import "./Signup.scss";
import Logo from "../../assets/GrooveLogs.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la cuenta");
      }

      navigate("/signup-success", {
        state: { email: formData.email }
      });

    } catch (err) {
      setError("No se pudo crear la cuenta");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={Logo} alt="GrooveLogs" className="login-logo" />
        <Link to="/" className="back-link">← Volver al inicio</Link>

        <h1>GrooveLogs</h1>
        <p className="subtitle">Tu plataforma musical definitiva</p>

        <div className="features">
          <div className="feature">
            <strong>Miles de canciones</strong>
            <p>Explora música de todos los géneros</p>
          </div>
          <div className="feature">
            <strong>Puntúa música</strong>
            <p>Califica tus canciones favoritas</p>
          </div>
          <div className="feature">
            <strong>Crea favoritos</strong>
            <p>Guarda tu música preferida</p>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Únete a GrooveLogs</h2>
          <p className="card-subtitle">
            Crea tu cuenta y descubre nueva música
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Nombre completo
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Contraseña
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Confirmar contraseña
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="login-button-page">
              Crear cuenta
            </button>
          </form>

          <p className="register-link">
            ¿Ya tienes una cuenta? <Link to="/signup-success">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
