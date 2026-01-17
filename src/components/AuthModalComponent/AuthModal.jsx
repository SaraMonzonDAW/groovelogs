import "./AuthModal.style.scss";

export default function AuthModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="auth-modal__close" onClick={onClose}>
          ✕
        </button>

        <div className="auth-modal__logo">
          <div className="logo-circle">GL</div>
        </div>

        <h2>Registrarse</h2>
        <p className="subtitle">Crea tu cuenta para empezar</p>

        <form className="auth-form">
          <label>
            Email
            <input type="email" placeholder="tu@email.com" />
          </label>

          <label>
            Contraseña
            <input type="password" placeholder="••••••••" />
          </label>

          <button type="submit" className="auth-submit">
            Crear Cuenta
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <span>Inicia sesión</span>
        </p>
      </div>
    </div>
  );
}
