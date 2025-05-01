
import { createContext, useContext, ReactNode } from "react";
import { Product } from "@/services/productService";
import { dummyProducts } from "@/data/dummyProducts";
import { ShoppingContextType } from "./types/ShoppingTypes";
import { useCart } from "@/hooks/useCart";
import { useProductSearch } from "@/hooks/useProductSearch";

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("useShoppingContext must be used within a ShoppingProvider");
  }
  return context;
};

export const ShoppingProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with dummy products
  const products: Product[] = dummyProducts;
  
  // Use our custom hooks
  const {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart
  } = useCart();
  
  const {
    searchQuery,
    isVoiceListening,
    userPreferences,
    recommendedProducts,
    updateSearchQuery,
    updateUserPreferences,
    setVoiceListening,
    processVoiceQuery
  } = useProductSearch(products);

  return (
    <ShoppingContext.Provider
      value={{
        products,
        cart,
        userPreferences,
        searchQuery,
        isVoiceListening,
        recommendedProducts,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        updateSearchQuery,
        updateUserPreferences,
        setVoiceListening,
        processVoiceQuery,
        clearCart,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
