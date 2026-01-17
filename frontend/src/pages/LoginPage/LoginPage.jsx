import "./Login.scss";
import Logo from "../../assets/GrooveLogs.png";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src={Logo}
          alt="GrooveLogs"
          className="login-logo"
        />

        <h1>GrooveLogs</h1>
        <p className="subtitle">Tu plataforma musical definitiva</p>

        <div className="features">
          <div className="feature">
            <span>Explora miles de canciones</span>
          </div>
          <div className="feature">
            <span>Puntúa tu música favorita</span>
          </div>
          <div className="feature">
            <span>Crea tu colección personal</span>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Iniciar sesión</h2>
          <p>Accede a tu cuenta de GrooveLogs</p>

          <form>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Contraseña"
                required
              />
            </div>

            <button type="submit" className="login-button-page">
              Iniciar sesión
            </button>
          </form>

          <p className="register-link">
            ¿No tienes cuenta? <a href="/login">Regístrate</a>
          </p>
        </div>
      </div>
    </div>
  );
}
