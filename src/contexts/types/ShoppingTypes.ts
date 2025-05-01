
import { Product } from "@/services/productService";

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
  color: string;
};

export type UserPreferences = {
  gender?: 'Men' | 'Women' | 'Unisex' | 'Kids';
  categories?: string[];
  size?: Record<string, string>; // e.g., { waist: "32", chest: "40" }
  priceRange?: { min: number; max: number };
  style?: string[];
  fabric?: string[];
  fit?: ('Slim' | 'Regular' | 'Loose' | 'Oversized')[];
};

export type ShoppingContextType = {
  products: Product[];
  cart: CartItem[];
  userPreferences: UserPreferences;
  searchQuery: string;
  isVoiceListening: boolean;
  recommendedProducts: Product[];
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  updateSearchQuery: (query: string) => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
  setVoiceListening: (isListening: boolean) => void;
  processVoiceQuery: (query: string) => void;
  clearCart: () => void;
};
