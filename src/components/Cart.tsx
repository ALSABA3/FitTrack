import { useContext } from "react";
import { CartContext } from "@/components/shopping-cart";

export default function Cart() {
  const { items, updateItemQuantity } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li
                key={item.id}
                className="m-4 flex flex-row items-center content-between"
              >
                <div className="w-full flex items-center">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 mr-4 rounded-sm"
                  />
                  <span className="mr-4">{item.name}</span>
                  <span className="mr-4"> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions flex">
                  <button
                    className="mx-2 text-white bg-red-600 rounded-sm p-2"
                    onClick={() => updateItemQuantity(item.id, -1)}
                  >
                    Remove
                  </button>
                  <span className="text-3xl">{item.quantity}</span>
                  <button
                    className="mx-2 text-white bg-green-600 rounded-sm p-2"
                    onClick={() => updateItemQuantity(item.id, 1)}
                  >
                    Add
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price" className="text-xl text-center">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
