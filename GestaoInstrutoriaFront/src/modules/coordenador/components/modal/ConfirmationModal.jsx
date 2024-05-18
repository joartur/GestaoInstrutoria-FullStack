import React from 'react';
import "./confirmationModal.css";

const ConfirmationModal = ({ message, onClose }) => {
    return (
        <div className="confirmationModal-overlay">
            <div className="confirmationModal-wrapper">
                <div className="confirmationModal-container">
                    <h2>Confirmação</h2>
                    <p>{message}</p>
                    <button className="close-btn" onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
