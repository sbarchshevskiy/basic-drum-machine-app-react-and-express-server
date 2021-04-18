import React, { useRef } from "react";
import useDraggabe from "../hooks/useDraggable";

const DraggableElement = ({ children }) => {
  const cardRef = useRef(null);
  useDraggabe(cardRef);

  return (
    <div className="move" ref={cardRef}>
      {children}
    </div>
  );
};

export default DraggableElement;
