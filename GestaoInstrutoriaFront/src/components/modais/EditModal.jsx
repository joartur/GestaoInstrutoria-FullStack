import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import ButtonFilter from "../buttons/ButtonFilter"
import "./editModal.css"

const EditModal = () => {
    return (
        <div className="deleteModal-whrapper">
            <div className="deletModal-container">
                <h2>Tem certeza que deseja Editar?</h2>
                <FontAwesomeIcon icon={faPenToSquare} className="edit-icon"/>
                <h2>As informações serão alteradas</h2>
                <div className="deleteModal-buttons">
                <ButtonFilter title="Cancelar" size="medium"/>
                <button className="edit-btn">Editar</button>
                </div>
            </div>
        </div>
    )
}

export default EditModal;