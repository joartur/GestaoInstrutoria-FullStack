import React from 'react';
import "./confirmationModal.css";

const ConfirmationModal = ({ message, onClose }) => {
    return (
        <div className="confirmationModal-overlay">
            <div className="confirmationModal-wrapper">
                <div className="confirmationModal-container">
                    <h2>{message? message[0] : null}</h2>
                    <p>{message? message[1]: null}</p>
                    <button className="close-btn" onClick={onClose}>Fechar</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
