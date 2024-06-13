import React from 'react';
import "./confirmationModal.css";

const ConfirmationModal = ({ message, onClose }) => {
    return (
        <div className="confirmationModal-overlay">
                <div className="confirmationModal-container">
                    <h2>{message? message[0] : null}</h2>
                    <p>{message? message[1]: null}</p>
                    <button className="close-btn" onClick={onClose}>Fechar</button>
                    <div className="esc"><p>Aperte "Esc" para Continuar</p></div>
                </div>
        </div>
    );
}

export default ConfirmationModal;
