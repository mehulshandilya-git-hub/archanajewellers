"use client";

import { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from "react";
import { StoreState, StoreAction, CartItem, Product } from "./types";

const initialState: StoreState = {
  cart: [],
  wishlist: [],
};

function storeReducer(state: StoreState, action: StoreAction): StoreState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity = 1 } = action.payload;
      const existing = state.cart.find((item) => item.product.id === product.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { product, quantity }] };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, cart: state.cart.filter((item) => item.product.id !== id) };
      }
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === id ? { ...item, quantity } : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "TOGGLE_WISHLIST": {
      const exists = state.wishlist.find((p) => p.id === action.payload.id);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((p) => p.id !== action.payload.id)
          : [...state.wishlist, action.payload],
      };
    }
    case "LOAD_STORAGE":
      return action.payload;
    default:
      return state;
  }
}

interface StoreContextType {
  state: StoreState;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
  cartCount: number;
  wishlistCount: number;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("archana-store");
      if (saved) {
        const parsed = JSON.parse(saved) as StoreState;
        dispatch({ type: "LOAD_STORAGE", payload: parsed });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("archana-store", JSON.stringify(state));
    } catch {}
  }, [state]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    dispatch({ type: "TOGGLE_WISHLIST", payload: product });
  }, []);

  const isInWishlist = useCallback(
    (id: string) => state.wishlist.some((p) => p.id === id),
    [state.wishlist]
  );

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = state.wishlist.length;
  const cartTotal = state.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <StoreContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        wishlistCount,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
