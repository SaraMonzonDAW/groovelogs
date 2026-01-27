import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.style.scss";
import Person from "../../assets/person.svg";
import Logo from "../../assets/logo.png";
import Logout from "../../assets/exit.svg";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleProfile = () => navigate("/profile");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="title">
        <img src={Logo} alt="GrooveLogs" className="header-logo" />
        <Link to="/">
          <h1>GrooveLogs</h1>
        </Link>
      </div>

      {!isAuthenticated ? (
        <button className="login-button" onClick={handleLogin}>
          <img src={Person} alt="User Icon" className="person-icon" />
          Iniciar Sesión
        </button>
      ) : (
        <div className="user-info">
          <div className="user-pill" onClick={handleProfile}>
            <div className="user-text">
              <span className="username">{user?.email.split("@")[0]}</span>
              <span className="email">{user?.email}</span>
            </div>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            <img src={Logout} alt="Cerrar sesión" />
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
