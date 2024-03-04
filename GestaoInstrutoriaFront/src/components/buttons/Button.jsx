import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import "./button.css"

const Button = (props) => {
    return (
        
        <Link to={props.url} > 
        <button className={`main-btn ${props.size}`} type={props.type}>
                {props.title}
        </button>
        </Link>
    )
}

export default Button;

