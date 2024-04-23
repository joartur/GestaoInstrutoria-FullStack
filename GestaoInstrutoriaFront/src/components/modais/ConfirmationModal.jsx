import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import "./confirmationModal.css"
import { Link } from 'react-router-dom'

const ConfirmationModal = (props) => {
    return(
        <div className="deleteModal-overlay">
        <div className="deleteModal-whrapper">
            <div className="deletModal-container">
                <h2>Registro Criado com Sucesso!</h2>
                <FontAwesomeIcon icon={faCircleCheck} className="confirm-icon"/> 
                <h2>Aguarde a Confirmação do Coordenador</h2>
                <div className="deleteModal-buttons">
                    <Link to="/tables">
                        <button className="cancel-btn" onClick={props.onCancel}>
                            Visualizar Serviços
                        </button>
                    </Link>
                    <button type="submit" className="confirm-btn" onClick={props.onClick}>Adicionar Mais</button>
                </div>
                <p>Aperte "Esc" para Continuar</p>
            </div>
        </div>
        </div>
    )
}

export default ConfirmationModal;