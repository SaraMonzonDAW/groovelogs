import "./Signup.scss";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import eyeOpen from "../../assets/eye-open.svg";
import eyeClosed from "../../assets/eye-closed.svg";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const cleanText = (text) =>
    text.trim().replace(/\s+/g, " ");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.nombre.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres");
      return false;
    }

    if (!formData.email.includes("@")) {
      setError("El email no es válido");
      return false;
    }

    if (formData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: cleanText(formData.nombre),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al crear la cuenta");
        setLoading(false);
        return;
      }

      navigate("/signup-success", {
        state: { email: formData.email },
      });

    } catch (err) {
      setError("No se pudo crear la cuenta. Inténtalo más tarde.");
    } finally {
      setLoading(false);
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
                maxLength={50}
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
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img src={showPassword ? eyeOpen : eyeClosed} alt="toggle password" />
                </button>
              </div>
            </label>
            <label>
              Confirmar contraseña
              <div className="password-field">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  <img src={showConfirmPassword ? eyeOpen : eyeClosed} alt="toggle password" />
                </button>
              </div>
            </label>

            {error && <p className="error">{error}</p>}

            <button
              type="submit"
              className="login-button-page"
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <p className="register-link">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

