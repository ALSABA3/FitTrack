import { forwardRef, useImperativeHandle, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";

interface CartModalProps {
  title: string;
  actions: ReactNode;
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
  }));

  return createPortal(
    <dialog id="modal" ref={dialog} className="rounded-lg">
      <h2 className="text-xl text-center my-4">{title}</h2>
      <Cart />
      <form
        method="dialog"
        id="modal-actions"
        className="text-xl flex items-center content-around my-4"
      >
        <button className="w-1/2">Close</button>
        <button className="w-1/2">Checkout</button>
      </form>
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
});

export default CartModal;
