import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import "./modal.css"

const Modal = (props) => {
    return(
        <div className="deleteModal-overlay">
        <div className="deleteModal-whrapper">
            <div className="deletModal-container">
                <h2>{props.title}</h2>
                <FontAwesomeIcon icon={props.modalIcon} className="confirm-icon"/> 
                <h2>{props.subtitle}</h2>
                <div className="deleteModal-buttons">
                    <Link to={props.url}>
                        <button className="cancel-btn" onClick={props.onCancel}>
                            Cancelar
                        </button>
                    </Link>
                    <button type="submit" className="confirm-btn" onClick={props.onConfirm}>
                        {props.mainButtonTitle}
                    </button>
                </div>
                <p>Aperte "Esc" para Continuar</p>
            </div>
        </div>
        </div>
    )
}

export default Modal;