import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import "./menuItem.css";

const MenuItem = ({ title, icon, url, active }) => {
    return (
        <li className={`menuItem-container ${active ? 'active' : ''}`}>
            <Link to={url}>
                <div className="menu-icon">
                    <FontAwesomeIcon icon={icon} className="icon" />
                </div>
                <p>{title}</p>
            </Link>
        </li>
    );
}

export default MenuItem;

