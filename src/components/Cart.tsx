import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/components/Store"; // Import RootState type from your store
import { cartActions } from "@/components/Store/cart-slice";

const Cart: React.FC = () => {
  // Define the type for cart items
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const amount = useSelector((state: RootState) => state.cart.totalAmount);

  const dispatch = useDispatch();

  const addHandler = (
    id: string,
    image: string,
    title: string,
    description: string,
    price: number
  ) => {
    dispatch(
      cartActions.addItem({
        id,
        image,
        title,
        description,
        price,
        quantity: 1,
        totalPrice: price,
      })
    );
  };

  const removeHandler = (id: string) => {
    dispatch(cartActions.removeItem(id));
  };

  return (
    <div id="cart">
      <h2>Your Shopping Cart</h2>
      <ul id="cart-items">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="m-4 flex flex-row items-center content-between"
          >
            <div className="w-full flex items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 mr-4 rounded-sm"
              />
              <span className="mr-4">{item.title}</span>
              <span className="mr-4"> {item.price} $</span>
            </div>
            <div className="cart-item-actions flex">
              <button
                className="mx-2 text-white bg-red-600 rounded-sm p-2"
                onClick={() => removeHandler(item.id)}
              >
                Remove
              </button>
              <span className="text-3xl">{item.quantity}</span>
              <button
                className="mx-2 text-white bg-green-600 rounded-sm p-2"
                onClick={() =>
                  addHandler(
                    item.id,
                    item.image,
                    item.title,
                    item.description,
                    item.price
                  )
                }
              >
                Add
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p id="cart-total-price" className="text-xl text-center">
        Cart Total: <strong>{amount}</strong>
      </p>
    </div>
  );
};

export default Cart;
