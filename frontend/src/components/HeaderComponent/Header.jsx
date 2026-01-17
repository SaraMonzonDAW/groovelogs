import './Header.style.scss';
import Person from '../../assets/person.svg';

function Header () {
  return (
    <header className='header'>
        <div className='title'>
          <p className="logo">GL</p>
          <h1>GrooveLogs</h1>
        </div>
        <button className='login-button'>
          <img src={Person} alt="User Icon" className='person-icon'/>
          Iniciar Sesión
        </button>

    </header>
  )
}

export default Header;