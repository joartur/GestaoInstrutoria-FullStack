import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./actionButton.css"
import { Link } from 'react-router-dom';

const ActionButton = ({url, legenda, icon, status}) => {
    const isDisabled = ["Validado", "Recusado", "Parcialmente Validado"].includes(status);
    console.log(isDisabled)
    
    return (
        <button className='actionButton-container' disabled={isDisabled}>
            <Link to={url} title={legenda}>
            <FontAwesomeIcon icon={icon} className="icon"/>
            </Link>
        </button>
    )
}

export default ActionButton;