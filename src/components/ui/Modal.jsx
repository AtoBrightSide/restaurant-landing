import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ children, className, open }) => {
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
  return createPortal(
    <dialog ref={dialogRef} className={className}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};
