import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import "./deleteModal.css"

const DeleteModal = ({ onCancel, onConfirm }) => {
    return (
        <div className="deleteModal-overlay">
        <div className="deleteModal-whrapper">
            <div className="deleteModal-container">
                <h2>Tem certeza que deseja deletar?</h2>
                <FontAwesomeIcon icon={faCircleExclamation} className="delete-icon"/>            
                <h2>Essa ação não pode ser revertida</h2>
                <div className="deleteModal-buttons">
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className="delete-btn" onClick={onConfirm}>
                        Deletar
                    </button>
                </div>
                <p>Aperte "Esc" para Cancelar</p>
            </div>
        </div>
        </div>
    )
}

export default DeleteModal;
