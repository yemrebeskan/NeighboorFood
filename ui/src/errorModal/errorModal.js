import React from 'react';
import Modal from 'react-modal';
import './errorModal.css';

const ErrorModal = ({ isOpen, errorMessage, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="error-modal"
      overlayClassName="error-modal-overlay"
    >
      <h2 className="error-modal__title">Error</h2>
      <p className="error-modal__message">{errorMessage}</p>
      <button className="error-modal__close" onClick={onClose}>
        Close
      </button>
    </Modal>
  );
};

export default ErrorModal;
