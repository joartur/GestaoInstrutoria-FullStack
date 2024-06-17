import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./actionButton.css";

const ActionButton = ({ url, legenda, icon, status }) => {
    const isDisabled = legenda !== "VISUALIZAR SERVIÇO" && ["Validado", "Parcialmente Validado"].includes(status);

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
