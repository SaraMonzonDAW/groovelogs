import { Link } from "react-router-dom";
import './Header.style.scss';
import Person from '../../assets/person.svg';
import Logo from "../../assets/logo.png";

function Header () {
  return (
    <header className='header'>
        <div className='title'>
          <img src={Logo} alt="GrooveLogs" className="header-logo" />
          <Link to="/" ><h1 >GrooveLogs</h1></Link>
        </div>
        <button className='login-button'>
          <img src={Person} alt="User Icon" className='person-icon'/>
          Iniciar Sesión
        </button>

    </header>
  )
}

export default Header;