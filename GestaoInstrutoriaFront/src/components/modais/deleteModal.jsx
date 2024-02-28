import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import ButtonFilter from "../buttons/ButtonFilter"
import "./deleteModal.css"

const DeleteModal = () => {
    return (
        <div className="deleteModal-whrapper">
            <div className="deletModal-container">
                <h2>Tem certeza que deseja deletar?</h2>
                <FontAwesomeIcon icon={faCircleExclamation} className="delete-icon"/>            
                <h2>Essa ação não pode ser revertida</h2>
                <div className="deleteModal-buttons">
                <ButtonFilter title="Cancelar" size="medium"/>
                <button className="delete-btn">Deletar</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;