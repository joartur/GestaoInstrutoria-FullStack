import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "./editModal.css";

const EditModal = ({ message, onClose, icon }) => {
    return (
        <div className="deleteModal-overlay">
        <div className="editModal-whrapper">
            <div className="editModal-container">
                <h2>{message? message[0] : null}</h2>

                <FontAwesomeIcon
                    icon={icon === true? faPenToSquare : faCircleXmark}
                    className={icon === true? "edit-icon" : "refuse-icon"}
                /> 

                <h2>{message? message[1]: null}</h2>
                <div className={icon === true? "editModal-buttons": "refuseModal-buttons"}>

                    {icon === true?
                    <Link to="/tables">
                        <button className="cancel-btn" onClick={onClose}>
                            Visualizar Serviços
                        </button>
                    </Link> :
                    null
                    }
                    <button type="submit"
                        className={icon === true? "edit-btn": "refuse-btn"}
                        onClick={onClose}>
                        {icon === true? "Continuar Editando" : "Tentar Novamente"}
                    </button>
                </div>

                <p>Aperte "Esc" para Continuar</p>
            </div>
        </div>
        </div>
    );
};

export default EditModal;


