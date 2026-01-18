import "./SignupSuccess.scss";
import { useLocation, Link } from "react-router-dom";

export default function SignupSuccess() {
  const location = useLocation();
  const email = location.state?.email || "tu email";

  return (
    <div className="signup-success-container">
      <div className="signup-success-card">
        <div className="success-icon">
          ✓
        </div>
        <h1>¡Registro completado!</h1>
        <p className="success-text">
          Tu cuenta se ha creado correctamente.
        </p>
        <p className="success-subtext">
          Ya puedes iniciar sesión con tu email y contraseña.
        </p>
        <div className="success-email">
          <span>Cuenta creada para:</span>
          <strong>{email}</strong>
        </div>
        <Link to="/login" className="success-button">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}

