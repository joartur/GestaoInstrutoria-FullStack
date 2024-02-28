import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import "./button.css"

const Button = (props) => {
    return (
        
        <Link to={props.url} > 
        <button className={`main-btn ${props.size}`}>
                {props.title}
                <FontAwesomeIcon icon={props.icon} className="btn-icon"/>
                </button>
        </Link>
    )
}

export default Button;

