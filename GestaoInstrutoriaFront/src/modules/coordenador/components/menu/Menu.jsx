import Logo from "../../../../image/logo_senac.png"
import MenuItem from "../../../../components/MenuItem/MenuItem"
import "./menu.css"
import { faHouse, faUser, faPenToSquare, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <aside>
            <div className="logo-container">
                <Link to="/">
                    <img src={Logo} alt="Logo Senac" />
                </Link>
            </div>
            <ul>
                <MenuItem title="Página Inicial" icon={faHouse} url="/"/>
                <MenuItem title="Perfil" icon={faUser} url="/profile/"/>
                <MenuItem title="Sair" icon={faDoorOpen} url="/login"/>
            </ul>
        </aside>
    )
}

export default Menu;