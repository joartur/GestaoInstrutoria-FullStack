import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./actionButton.css"
import { Link } from 'react-router-dom';

const ActionButton = (props) => {
    return (
        <div className='actionButton-container'>
            <Link to={props.url}>
            <button>
            <FontAwesomeIcon icon={props.icon} className="icon"/>
            </button>
            </Link>
        </div>
    )
}

export default ActionButton;