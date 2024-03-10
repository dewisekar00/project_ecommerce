import React from "react";

const Modal = ({ isOpen, message, onClose, onConfirm, value }) => {
  
  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Message</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
          <button className="btn bg-green-300 mx-4" onClick={onConfirm}>
         {value}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
