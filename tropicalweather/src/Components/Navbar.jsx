import '../css/Navbar.css';
import { TiWeatherCloudy } from "react-icons/ti";
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    const links = [
        { path: "/inicio", label: "Inicio" },
        { path: "/regiones", label: "Regiones" },
        { path: "/Acercade", label: "Acerca de" },
    ];

    return(
        <nav className='navbar'>
            <div className='navbar-logo'>
                <TiWeatherCloudy className='navbar-icon'/>
                <h1>TropicalWeather</h1>
            </div>
            <div className='navbar-links'>
                {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={location.pathname === link.path ? 'active' : ''}
                >
                    {link.label}
                </Link>
                ))}
            </div>
        </nav>
    );
}
export default Navbar;