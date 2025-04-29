import { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  salePrice?: number;
  images: string[];
  gender: 'Men' | 'Women' | 'Unisex' | 'Kids';
  sizes: string[];
  colors: string[];
  confidence?: number;
  fit?: 'Slim' | 'Regular' | 'Loose' | 'Oversized';
  fabric: string;
  description: string;
  bestFit?: boolean;
};

type CartItem = {
  product: Product;
  quantity: number;
  size: string;
  color: string;
};

type UserPreferences = {
  gender?: 'Men' | 'Women' | 'Unisex' | 'Kids';
  categories?: string[];
  size?: Record<string, string>; // e.g., { waist: "32", chest: "40" }
  priceRange?: { min: number; max: number };
  style?: string[];
  fabric?: string[];
  fit?: ('Slim' | 'Regular' | 'Loose' | 'Oversized')[];
};

type ShoppingContextType = {
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

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("useShoppingContext must be used within a ShoppingProvider");
  }
  return context;
};

export const ShoppingProvider = ({ children }: { children: ReactNode }) => {
  const [products] = useState<Product[]>(dummyProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    setCart(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.product.id === product.id && item.size === size && item.color === color
      );
      
      if (existingItemIndex >= 0) {
        const updatedCart = [...prev];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prev, { product, quantity, size, color }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    setCart(prev => 
      prev.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
    
    // Basic filtering logic based on search query
    const filteredProducts = dummyProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) || 
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setRecommendedProducts(filteredProducts);
  };

  const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({
      ...prev,
      ...preferences
    }));
    
    // Basic recommendation engine based on user preferences
    let filteredProducts = [...dummyProducts];
    
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
        (p.salePrice || p.price) >= (preferences.priceRange?.min || 0) && 
        (p.salePrice || p.price) <= (preferences.priceRange?.max || Infinity)
      );
    }
    
    if (preferences.fit?.length) {
      filteredProducts = filteredProducts.filter(p => 
        p.fit && preferences.fit?.includes(p.fit)
      );
    }
    
    if (preferences.fabric?.length) {
      filteredProducts = filteredProducts.filter(p => 
        preferences.fabric?.some(f => p.fabric.toLowerCase().includes(f.toLowerCase()))
      );
    }
    
    // Add confidence score to products (simplified version)
    const productsWithConfidence = filteredProducts.map(p => {
      // Simple mock confidence scoring - in a real system, this would be ML-based
      const confidence = Math.random() * 0.5 + 0.5; // Random score between 0.5 and 1.0
      return {
        ...p,
        confidence,
        bestFit: confidence > 0.85, // Mark as best fit if confidence is high
      };
    });
    
    // Sort by confidence
    productsWithConfidence.sort((a, b) => (b.confidence || 0) - (a.confidence || 0));
    
    setRecommendedProducts(productsWithConfidence);
  };
  
  const processVoiceQuery = (query: string) => {
    // In a real application, this would use NLP to extract preferences from voice input
    console.log("Processing voice query:", query);
    
    // Simple keyword detection for demo purposes
    const genderKeywords = {
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
    
    const categoryKeywords = {
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
    
    const fitKeywords = {
      slim: "Slim",
      regular: "Regular",
      loose: "Loose",
      oversized: "Oversized",
      baggy: "Loose",
      fitted: "Slim",
    };
    
    const fabricKeywords = [
      "cotton", "denim", "wool", "silk", "polyester", "linen", "leather", "suede"
    ];

    const queryLower = query.toLowerCase();
    const words = queryLower.split(/\s+/);
    const newPreferences: Partial<UserPreferences> = {};
    
    // Extract gender
    for (const word of words) {
      const gender = genderKeywords[word as keyof typeof genderKeywords];
      if (gender) {
        newPreferences.gender = gender as 'Men' | 'Women' | 'Unisex' | 'Kids';
        break;
      }
    }
    
    // Extract categories
    const categories: string[] = [];
    for (const word of words) {
      const category = categoryKeywords[word as keyof typeof categoryKeywords];
      if (category) {
        categories.push(category);
      }
    }
    if (categories.length) {
      newPreferences.categories = categories;
    }
    
    // Extract fit
    const fits: ('Slim' | 'Regular' | 'Loose' | 'Oversized')[] = [];
    for (const word of words) {
      const fit = fitKeywords[word as keyof typeof fitKeywords];
      if (fit) {
        fits.push(fit as 'Slim' | 'Regular' | 'Loose' | 'Oversized');
      }
    }
    if (fits.length) {
      newPreferences.fit = fits;
    }
    
    // Extract fabrics
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
    
    // Update search query and preferences
    setSearchQuery(query);
    updateUserPreferences(newPreferences);
  };
  
  const clearCart = () => {
    setCart([]);
  };

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
        setVoiceListening: setIsVoiceListening,
        processVoiceQuery,
        clearCart,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

// Dummy products data
const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Classic Fit Cotton Oxford Shirt",
    brand: "StyleCraft",
    category: "Shirts",
    price: 49.99,
    salePrice: 39.99,
    images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Classic+Shirt"],
    gender: "Men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Blue", "Black"],
    fit: "Regular",
    fabric: "100% Cotton Oxford",
    description: "A timeless classic, this oxford shirt features a comfortable regular fit and premium cotton fabric."
  },
  {
    id: "2",
    name: "Slim Fit Stretch Denim Jeans",
    brand: "UrbanEdge",
    category: "Jeans",
    price: 79.99,
    images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Slim+Jeans"],
    gender: "Men",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Dark Blue", "Black", "Gray"],
    fit: "Slim",
    fabric: "98% Cotton, 2% Elastane",
    description: "Modern slim fit jeans with just the right amount of stretch for all-day comfort."
  },
  {
    id: "3",
    name: "Oversized Graphic Print T-Shirt",
    brand: "StreetLife",
    category: "T-Shirts",
    price: 34.99,
    salePrice: 24.99,
    images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Graphic+Tee"],
    gender: "Unisex",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray", "Green"],
    fit: "Oversized",
    fabric: "100% Organic Cotton",
    description: "Make a statement with this bold graphic print tee featuring an oversized fit for ultimate style and comfort."
  },
  {
    id: "4",
    name: "Floral Print Wrap Dress",
    brand: "Blossom",
    category: "Dresses",
    price: 89.99,
    images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Wrap+Dress"],
    gender: "Women",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blue Floral", "Red Floral", "Black Floral"],
    fit: "Regular",
    fabric: "Polyester Blend",
    description: "Elegant floral print wrap dress perfect for any occasion. Features a flattering silhouette and comfortable fit."
  },
  {
    id: "5",
    name: "High-Rise Skinny Jeans",
    brand: "UrbanEdge",
    category: "Jeans",
    price: 69.99,
    images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Skinny+Jeans"],
    gender: "Women",
    sizes: ["24", "26", "28", "30", "32"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    fit: "Slim",
    fabric: "95% Cotton, 5% Elastane",
    description: "High-rise skinny jeans with excellent stretch and recovery for a perfect fit every time."
  },
  {
    id: "6",
    name: "Wool-Blend Oversized Sweater",
    brand: "Comfortline",
    category: "Sweaters",
    price: 99.99,
    salePrice: 79.99,
    images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Wool+Sweater"],
    gender: "Women",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Gray", "Black", "Burgundy"],
    fit: "Oversized",
    fabric: "70% Wool, 30% Polyester",
    description: "Stay cozy and stylish with this luxurious wool-blend oversized sweater, perfect for cooler days."
  },
  {
    id: "7",
    name: "Cotton Stretch Polo Shirt",
    brand: "SportLux",
    category: "Shirts",
    price: 44.99,
    images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Polo+Shirt"],
    gender: "Men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "White", "Red", "Green"],
    fit: "Regular",
    fabric: "95% Cotton, 5% Elastane",
    description: "Classic polo shirt made with premium stretch cotton for comfort and durability."
  },
  {
    id: "8",
    name: "Leather Bomber Jacket",
    brand: "UrbanEdge",
    category: "Jackets",
    price: 199.99,
    images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Leather+Jacket"],
    gender: "Men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
    fit: "Regular",
    fabric: "Genuine Leather",
    description: "Timeless leather bomber jacket crafted from premium quality leather for style that lasts."
  },
  {
    id: "9",
    name: "Linen Blend Summer Dress",
    brand: "Blossom",
    category: "Dresses",
    price: 79.99,
    salePrice: 59.99,
    images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Linen+Dress"],
    gender: "Women",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Beige", "Light Blue"],
    fit: "Loose",
    fabric: "55% Linen, 45% Cotton",
    description: "Light and airy linen-blend dress, perfect for warm summer days and casual outings."
  },
  {
    id: "10",
    name: "Kids Graphic Dinosaur T-Shirt",
    brand: "TinyTrends",
    category: "T-Shirts",
    price: 24.99,
    images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Kids+Tee"],
    gender: "Kids",
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    colors: ["Blue", "Green", "Red"],
    fit: "Regular",
    fabric: "100% Organic Cotton",
    description: "Fun and playful dinosaur print t-shirt made with soft organic cotton, perfect for little explorers."
  },
  {
    id: "11",
    name: "Relaxed Fit Linen Shirt",
    brand: "StyleCraft",
    category: "Shirts",
    price: 59.99,
    images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Linen+Shirt"],
    gender: "Men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Beige", "Light Blue", "Olive"],
    fit: "Loose",
    fabric: "100% Linen",
    description: "Stay cool and stylish with this breathable pure linen shirt featuring a relaxed fit."
  },
  {
    id: "12",
    name: "Cropped Wide-Leg Pants",
    brand: "UrbanEdge",
    category: "Pants",
    price: 69.99,
    salePrice: 49.99,
    images: ["https://placehold.co/600x800/e2e8f0/1e293b?text=Wide+Pants"],
    gender: "Women",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Beige"],
    fit: "Loose",
    fabric: "Tencel Lyocell Blend",
    description: "Contemporary wide-leg pants with a cropped length, perfect for creating stylish outfits for any occasion."
  }
];

export default ShoppingContext;
