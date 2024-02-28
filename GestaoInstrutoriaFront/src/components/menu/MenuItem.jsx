import "./menuItem.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';


const MenuItem = (props) => {
    return (
        <li className="menuItem-container">
            <Link to={props.url}>
                <div className="menu-icon">
                    <FontAwesomeIcon icon={props.icon} className="icon"/>
                </div>
                <p>{props.title}</p>
            </Link>
        </li>
    )
}

export default MenuItem;