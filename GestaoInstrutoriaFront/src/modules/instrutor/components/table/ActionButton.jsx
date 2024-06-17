import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./actionButton.css";
import { Link } from 'react-router-dom';

const ActionButton = ({ url, legenda, icon, status }) => {
    const isDisabled = legenda !== "VISUALIZAR SERVIÇO" && ["Validado", "Recusado", "Parcialmente Validado"].includes(status);

    const handleClick = (event) => {
        if (isDisabled) {
            event.preventDefault();
            event.stopPropagation(); // Impede a propagação do evento
        }
    };

    return (
        <button 
            className={`actionButton-container ${isDisabled ? 'disabled' : ''}`} 
            disabled={isDisabled}
        >
            <a href={isDisabled ? "#" : url} title={legenda} onClick={handleClick}>
                <FontAwesomeIcon icon={icon} className="icon" />
            </a>
        </button>
    );
};

export default ActionButton;
