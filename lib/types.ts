export interface Product {
  id: string;
  name: string;
  category: string;
  purity: string;
  weight: string;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  images: string[];
  badge?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
}

export type StoreAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; quantity?: number } }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_WISHLIST"; payload: Product }
  | { type: "LOAD_STORAGE"; payload: StoreState };
