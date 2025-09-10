// hooks/useFocusTrap.js
import { useEffect, useRef } from "react";

export const useFocusTrap = (isOpen) => {
  // 1. Ref para o container que vai "prender" o foco (o modal)
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !containerRef.current) {
      return;
    }

    const container = containerRef.current;

    // 2. Lógica para encontrar todos os elementos focáveis dentro do container
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // 3. Foca no primeiro elemento assim que o modal abre
    firstElement?.focus();

    const handleKeyDown = (event) => {
      if (event.key !== "Tab") {
        return;
      }

      // 4. Lógica da "armadilha"
      if (event.shiftKey) {
        // Shift + Tab (navegando para trás)
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else {
        // Tab (navegando para frente)
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    // 5. Adiciona e remove o listener
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]); // O efeito depende do estado 'isOpen'

  // 6. Retorna a ref para ser conectada ao componente
  return containerRef;
};
