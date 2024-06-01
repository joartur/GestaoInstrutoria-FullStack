import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import "./confirmationModal.css"
import { Link } from 'react-router-dom'

const ConfirmationModal = ({message, onClose, icon}) => {
    return(
        <div className="deleteModal-overlay">
        <div className="confirmationModal-whrapper">
            <div className="confirmationModal-container">
                <h2>{message? message[0] : null}</h2>

                <FontAwesomeIcon
                    icon={icon === true? faCircleCheck : faCircleXmark}
                    className={icon === true? "confirm-icon" : "refuse-icon"}
                /> 

                <h2>{message? message[1]: null}</h2>
                <div className={icon === true? "confirmationModal-buttons": "refuseModal-buttons"}>

                    {icon === true?
                    <Link to="/tables">
                        <button className="cancel-btn" onClick={onClose}>
                            Visualizar Serviços
                        </button>
                    </Link> :
                    null
                    }
                    <button type="submit"
                        className={icon === true? "confirm-btn": "refuse-btn"}
                        onClick={onClose}>
                        {icon === true? "Adicionar Mais" : "Tentar Novamente"}
                    </button>
                </div>

                <p>Aperte "Esc" para Continuar</p>
            </div>
        </div>
        </div>
    )
}

export default ConfirmationModal;