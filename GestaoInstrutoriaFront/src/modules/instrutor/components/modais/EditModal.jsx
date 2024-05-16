import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "./editModal.css";

const EditModal = ({ onCancel, onClick }) => {
    return (
        <div className="deleteModal-overlay">
        <div className="deleteModal-whrapper">
            <div className="deletModal-container">
                <h2>Serviço Editado com Sucesso!</h2>
                <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
                <h2>Aguarde a Confirmação do Cordenador </h2>
                <div className="deleteModal-buttons">
                    <Link to="/tables">
                        <button className="cancel-btn" onClick={onCancel}>
                            Visualizar Serviços
                        </button>
                    </Link>
                    <button type="submit" className="edit-btn" onClick={onClick}>Continuar Edição</button>
                </div>
                <p>Aperte "Esc" para Continuar</p>

            </div>
        </div>
        </div>
    );
};

export default EditModal;


