// components/Modal.js
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  // O hook nos retorna a ref que devemos conectar ao nosso container
  const modalRef = useFocusTrap(isOpen);

  // Efeito extra para fechar com a tecla 'Esc'
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      // Conectamos a ref aqui!
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Adicionar ao Carrinho</h2>
      {children}
      <button>Confirmar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default Modal;