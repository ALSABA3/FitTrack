import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";

interface CartModalProps {
  title: string;
  actions: React.ReactNode;
}

interface ModalHandle {
  open: () => void;
}

const CartModal = forwardRef<ModalHandle, CartModalProps>(function Modal(
  { title, actions },
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      if (dialog.current) {
        dialog.current.showModal();
      }
    },
    close: () => {
      if (dialog.current) {
        dialog.current.close();
      }
    },
  }));

  return createPortal(
    <dialog id="modal" ref={dialog} className="rounded-lg">
      <h2 className="text-xl text-center my-4">{title}</h2>
      <Cart />
      <div
        id="modal-actions"
        className="text-xl flex items-center justify-around my-4"
      >
        {actions}
      </div>
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
});

export default CartModal;
