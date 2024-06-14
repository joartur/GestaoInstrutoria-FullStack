import React from 'react';
import './topBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import logo from "../../image/logo_senac.png";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="logo-container">
        <img src={logo} alt="Logo" style={{ display: 'block' }} />
      </div>
      <div className="user-info-topbar">
        <h3>Nome do Usuário</h3>
        <p>Unidade Senac</p>
      </div>
      <FontAwesomeIcon icon={faBell} className='notification-icon-bell' />
    </div>
  );
};

export default TopBar;
