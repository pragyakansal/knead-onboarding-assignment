import React, {useState} from 'react';
import errorIcon from '../../assets/icons/error-icon.png';
import successIcon from '../../assets/icons/success-icon.png';
import './MessageModal.css'

const MessageModal = ({feedbackMessage, successMessage, errorMessage}) => {
  const isSuccess = feedbackMessage === successMessage;
  return (
    <>
    <div className="modal-overlay">
      <div className="modal-box">
        {isSuccess ? <img src={successIcon} className="modal-icon" /> : <img src={errorIcon} className="modal-icon" />}
        <h2 className="modal-header">{isSuccess ? 'Success' : 'Error'}</h2>
        <p className="modal-message">{isSuccess ? successMessage : errorMessage}</p>
        <button className="modal-button">
          <p>OK</p>
        </button>
      </div>
    </div>
    </>
  );
}

export default MessageModal;