import "./AuthModal.style.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AuthModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSignUp = () => {
    onClose();
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();

      // 🔥 CLAVE: actualizar el AuthContext
      login(data.token);

      onClose();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose}>✕</button>

        <div className="auth-modal__logo">
          <div className="logo-circle">GL</div>
        </div>

        <h2>Iniciar sesión</h2>
        <p className="subtitle">Inicia sesión para empezar</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit">
            Iniciar Sesión
          </button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta?{" "}
          <span onClick={handleSignUp} style={{ cursor: "pointer" }}>
            Crea una
          </span>
        </p>
      </div>
    </div>
  );
}