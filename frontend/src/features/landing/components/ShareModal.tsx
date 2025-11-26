import React from "react";
import "./ShareModal.css";

interface ModalProps {
   isOpen: boolean;
   onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
   if (!isOpen) return null;

   return (
      <div className="modalBackdrop" onClick={onClose}>
         <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>Let’s Spark a Viral Healing Movement!!</h2>
            <p>
               Please share the link to Play to Heal now copied to your clipboard with
               everyone you know - bringing connection, lightness, joy, and a brighter way
               forward to every person who plays.
            </p>
            <p>
               We are offering this platform <b>FREE</b> as part of our mission to uplift
               us, and to make healing accessible for all!
            </p>
            <div className="close">
               <button onClick={onClose} className="closeButton">
                  Close
               </button>
            </div>
         </div>
      </div>
   );
};

export default Modal;
