import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import "./editModal.css";

const EditModal = ({ onCancel, onClick }) => {
    return (
        <div className="editModal-overlay">
            <div className="editModal-wrapper">
                <div className="editModal-container">
                    <h2>Tem certeza que deseja editar?</h2>
                    <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
                    <h2>As informações serão alteradas</h2>
                    <div className="editModal-buttons">
                        <button className="cancel-btn" onClick={onCancel}>
                            Cancelar
                        </button>
                        <button className="edit-btn" onClick={onClick}>
                            Editar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
