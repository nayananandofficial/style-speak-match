
import { Product } from "@/services/productService";
import { UserPreferences } from "../types/ShoppingTypes";

// Product filtering based on user preferences
export function filterProductsByPreferences(
  products: Product[], 
  preferences: Partial<UserPreferences>
): Product[] {
  let filteredProducts = [...products];
  
  if (preferences.gender) {
    filteredProducts = filteredProducts.filter(p => 
      p.gender === preferences.gender || p.gender === 'Unisex'
    );
  }
  
  if (preferences.categories?.length) {
    filteredProducts = filteredProducts.filter(p => 
      preferences.categories?.includes(p.category)
    );
  }
  
  if (preferences.priceRange) {
    filteredProducts = filteredProducts.filter(p => 
      (p.sale_price || p.price) >= (preferences.priceRange?.min || 0) && 
      (p.sale_price || p.price) <= (preferences.priceRange?.max || Infinity)
    );
  }
  
  // We need to adjust this to work with the Product type from productService
  if (preferences.fabric?.length) {
    filteredProducts = filteredProducts.filter(p => {
      if (typeof p.description === 'string') {
        return preferences.fabric?.some(f => p.description.toLowerCase().includes(f.toLowerCase()));
      }
      return false;
    });
  }
  
  // Add confidence score to products (simplified version)
  const productsWithConfidence = filteredProducts.map(p => {
    // Simple mock confidence scoring - in a real system, this would be ML-based
    const confidence = Math.random() * 0.5 + 0.5; // Random score between 0.5 and 1.0
    return {
      ...p,
      confidence,
    };
  });
  
  // Sort by confidence
  productsWithConfidence.sort((a, b) => ((b as any).confidence || 0) - ((a as any).confidence || 0));
  
  return productsWithConfidence;
}

// Filter products based on search query
export function filterProductsBySearch(products: Product[], query: string): Product[] {
  return products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
}

// Parse voice query to extract preferences
export function parseVoiceQuery(query: string): Partial<UserPreferences> {
  const queryLower = query.toLowerCase();
  const words = queryLower.split(/\s+/);
  const newPreferences: Partial<UserPreferences> = {};
  
  // Extract gender
  const genderKeywords: Record<string, 'Men' | 'Women' | 'Unisex' | 'Kids'> = {
    men: "Men",
    male: "Men", 
    man: "Men",
    women: "Women",
    female: "Women",
    woman: "Women",
    kid: "Kids",
    kids: "Kids",
    child: "Kids",
    children: "Kids",
    unisex: "Unisex"
  };
  
  for (const word of words) {
    const gender = genderKeywords[word];
    if (gender) {
      newPreferences.gender = gender;
      break;
    }
  }
  
  // Extract categories
  const categoryKeywords: Record<string, string> = {
    shirt: "Shirts",
    tshirt: "T-Shirts",
    t: "T-Shirts",
    tee: "T-Shirts",
    jeans: "Jeans",
    pant: "Pants",
    pants: "Pants",
    dress: "Dresses",
    jacket: "Jackets",
    sweater: "Sweaters",
  };
  
  const categories: string[] = [];
  for (const word of words) {
    const category = categoryKeywords[word];
    if (category) {
      categories.push(category);
    }
  }
  if (categories.length) {
    newPreferences.categories = categories;
  }
  
  // Extract fabrics
  const fabricKeywords = [
    "cotton", "denim", "wool", "silk", "polyester", "linen", "leather", "suede"
  ];
  
  const fabrics: string[] = [];
  for (const word of words) {
    if (fabricKeywords.includes(word)) {
      fabrics.push(word);
    }
  }
  if (fabrics.length) {
    newPreferences.fabric = fabrics;
  }
  
  // Extract price range
  const priceMatch = queryLower.match(/under (\d+)|less than (\d+)|below (\d+)|around (\d+)|about (\d+)|(\d+) to (\d+)/);
  if (priceMatch) {
    if (priceMatch[1] || priceMatch[2] || priceMatch[3]) {
      const maxPrice = parseInt(priceMatch[1] || priceMatch[2] || priceMatch[3] || "0");
      newPreferences.priceRange = { min: 0, max: maxPrice };
    } else if (priceMatch[4] || priceMatch[5]) {
      const approxPrice = parseInt(priceMatch[4] || priceMatch[5] || "0");
      newPreferences.priceRange = { 
        min: approxPrice * 0.8, 
        max: approxPrice * 1.2 
      };
    } else if (priceMatch[6] && priceMatch[7]) {
      newPreferences.priceRange = { 
        min: parseInt(priceMatch[6]), 
        max: parseInt(priceMatch[7]) 
      };
    }
  }
  
  return newPreferences;
}
