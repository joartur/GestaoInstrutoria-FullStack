import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import ButtonFilter from "../buttons/ButtonFilter"
import "./confirmationModal.css"

const ConfirmationModal = () => {
    return(
        <div className="deleteModal-whrapper">
            <div className="deletModal-container">
                <h2>Registro Criado com Sucesso!</h2>
                <FontAwesomeIcon icon={faCircleCheck} className="confirm-icon"/> 
                <h2>Aguarde a Confirmação do Cordenador </h2>
                <div className="deleteModal-buttons">
                <ButtonFilter title="Visualizar Serviços" size="medium"/>
                <button className="confirm-btn">Adicionar Mais</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;