"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { cartLineId } from "@/lib/utils";

const CartContext = createContext(null);

function normalizeQuantity(value) {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return null;
  const rounded = Math.floor(parsed);
  if (rounded < 1) return null;
  return rounded;
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, size, quantity = 1 } = action.payload;
      if (!product?.id || !size) return state;

      const qty = normalizeQuantity(quantity) ?? 1;
      const id = cartLineId(product.id, size);
      const existing = state.items.find((item) => item.id === id);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + qty }
              : item,
          ),
        };
      }

      const primaryImage = product.images?.[0] ?? null;

      return {
        items: [
          ...state.items,
          {
            id,
            productId: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            image: primaryImage
              ? { src: primaryImage.src, alt: primaryImage.alt }
              : null,
            size,
            quantity: qty,
          },
        ],
      };
    }

    case "REMOVE_ITEM": {
      return {
        items: state.items.filter((item) => item.id !== action.id),
      };
    }

    case "INCREASE_QUANTITY": {
      return {
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    }

    case "DECREASE_QUANTITY": {
      const target = state.items.find((item) => item.id === action.id);
      if (!target) return state;

      if (target.quantity <= 1) {
        return {
          items: state.items.filter((item) => item.id !== action.id),
        };
      }

      return {
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };
    }

    case "UPDATE_QUANTITY": {
      const qty = normalizeQuantity(action.quantity);
      if (qty === null) {
        return {
          items: state.items.filter((item) => item.id !== action.id),
        };
      }

      return {
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: qty } : item,
        ),
      };
    }

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = useCallback((product, size, quantity = 1) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { product, size, quantity },
    });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: "REMOVE_ITEM", id });
  }, []);

  const increaseQuantity = useCallback((id) => {
    dispatch({ type: "INCREASE_QUANTITY", id });
  }, []);

  const decreaseQuantity = useCallback((id) => {
    dispatch({ type: "DECREASE_QUANTITY", id });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const itemCount = useMemo(
    () => state.items.reduce((total, item) => total + item.quantity, 0),
    [state.items],
  );

  const subtotal = useMemo(
    () =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    [state.items],
  );

  const value = useMemo(
    () => ({
      items: state.items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      updateQuantity,
      clearCart,
    }),
    [
      state.items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
