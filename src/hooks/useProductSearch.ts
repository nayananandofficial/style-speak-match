
import { useState } from "react";
import { Product } from "@/services/productService";
import { UserPreferences } from "@/contexts/types/ShoppingTypes";
import { 
  filterProductsByPreferences, 
  filterProductsBySearch, 
  parseVoiceQuery 
} from "@/contexts/utils/productRecommendations";

export function useProductSearch(products: Product[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({});
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
    
    // Basic filtering logic based on search query
    const filteredProducts = filterProductsBySearch(products, query);
    setRecommendedProducts(filteredProducts);
  };

  const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({
      ...prev,
      ...preferences
    }));
    
    // Basic recommendation engine based on user preferences
    const filteredProducts = filterProductsByPreferences(products, {
      ...userPreferences,
      ...preferences
    });
    
    setRecommendedProducts(filteredProducts);
  };
  
  const processVoiceQuery = (query: string) => {
    // In a real application, this would use NLP to extract preferences from voice input
    console.log("Processing voice query:", query);
    
    // Simple keyword detection for demo purposes
    const newPreferences = parseVoiceQuery(query);
    
    // Update search query and preferences
    setSearchQuery(query);
    updateUserPreferences(newPreferences);
  };

  return {
    searchQuery,
    isVoiceListening,
    userPreferences,
    recommendedProducts,
    updateSearchQuery,
    updateUserPreferences,
    setVoiceListening: setIsVoiceListening,
    processVoiceQuery
  };
}
