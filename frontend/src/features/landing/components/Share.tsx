import React from "react";
import "./Share.css";

interface CopyButtonProps {
   onClick: () => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ onClick }) => {
   return (
      <button onClick={onClick} className="copyButton">
         Play it Forward
      </button>
   );
};

export default CopyButton;
