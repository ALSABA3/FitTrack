import { createContext, useReducer, ReactNode } from "react";
import data from "@/dummy-products.json";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

interface CartState {
  items: CartItem[];
}

interface CartContextProps {
  items: CartItem[];
  addItemToCart: (id: string) => void;
  updateItemQuantity: (productId: string, amount: number) => void;
}

export const CartContext = createContext<CartContextProps>({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

type Action =
  | { type: "AddItem"; payload: string }
  | { type: "UpdateItem"; payload: { productId: string; amount: number } };

function shoppingCartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "AddItem": {
      const updatedItems = [...state.items];
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      const existingCartItem = updatedItems[existingCartItemIndex];
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = data.find((product) => product.id === action.payload);
        if (product) {
          updatedItems.push({
            id: action.payload,
            name: product.title,
            price: product.price,
            quantity: 1,
            img: product.image,
          });
        }
      }

      return {
        ...state,
        items: updatedItems,
      };
    }
    case "UpdateItem": {
      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.productId
      );
      const updatedItem = { ...updatedItems[updatedItemIndex] };
      updatedItem.quantity += action.payload.amount;
      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }
      return {
        ...state,
        items: updatedItems,
      };
    }
    default:
      return state;
  }
}

interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [shoppingCart, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
    items: [],
  });

  function handleAddItemToCart(id: string) {
    shoppingCartDispatch({
      type: "AddItem",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    shoppingCartDispatch({
      type: "UpdateItem",
      payload: { productId, amount },
    });
  }

  const ctxValue: CartContextProps = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
