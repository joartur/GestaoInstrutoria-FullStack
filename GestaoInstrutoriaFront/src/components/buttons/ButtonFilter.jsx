import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import "./buttonFilter.css"

const ButtonFilter = (props) => {
    return (
        <Link to={props.url}>
        <button className={`filter-btn ${props.size}`}>
            {props.title}
        </button>
        </Link>
    )
}

export default ButtonFilter;

