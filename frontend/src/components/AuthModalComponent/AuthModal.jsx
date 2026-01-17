import "./AuthModal.style.scss";

export default function AuthModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleSignUp = () => {
    window.location.href = "/signup";
  };

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

        <h2>Iniciar sesión</h2>
        <p className="subtitle">Inicia sesión para empezar</p>

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
            Iniciar Sesión
          </button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta? <span onClick={handleSignUp} style={{ cursor: "pointer" }}>Crea una</span>
        </p>
      </div>
    </div>
  );
}
