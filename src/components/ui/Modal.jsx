import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ children, className = "", open, onClose }) => {
  const dialogRef = useRef();
  useEffect(() => {
    const modal = dialogRef.current;
    if (open) {
      modal.showModal();
    }
    return () => {
      modal.close();
    };
  }, [open]);

  const cssClasses = "modal" + " " + className;
  return createPortal(
    <dialog ref={dialogRef} onClose={onClose} className={cssClasses}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};
