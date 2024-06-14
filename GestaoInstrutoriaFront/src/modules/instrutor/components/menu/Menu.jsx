import React, { useState, useEffect } from "react";
import Logo from "../../../../image/logo_senac.png";
import MenuItem from "../../../../components/MenuItem/MenuItem";
import "../menu/menu.css";
import { faHouse, faUser, faBook, faPenToSquare, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location.pathname]);

    return (
        <aside className="menu-container">
            <div className="logo-container">
                <Link to="/">
                    <img src={Logo} alt="Logo Senac" />
                </Link>
            </div>
            <ul className="menu-list">
                <MenuItem title="Página Inicial" icon={faHouse} url="/" active={activeItem === "/"} />
                <MenuItem title="Histórico de Serviços" icon={faBook} url="/tables" active={activeItem === "/tables"} />
                <MenuItem title="Adicionar Serviço " icon={faPenToSquare} url="/createService" active={activeItem === "/createService"} />
                <MenuItem title="Perfil" icon={faUser} url="/profile" active={activeItem === "/profile"} />
                <MenuItem title="Sair" icon={faDoorOpen} url="/login" active={activeItem === "/login"} />
            </ul>
        </aside>
    );
}

export default Menu;
