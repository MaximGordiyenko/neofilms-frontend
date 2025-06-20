import React from 'react';
import './style.css';

export const CustomModal = ({ isOpen, onClose, title, content }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">{content}</div>
      </div>
    </div>
  );
};