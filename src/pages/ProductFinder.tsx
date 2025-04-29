import { useState, useEffect } from "react";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import Layout from "@/components/Layout";
import VoiceSearchBar from "@/components/common/VoiceSearchBar";
import ProductGrid from "@/components/products/ProductGrid";
import { Loader2, Sliders } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const ProductFinder = () => {
  const { searchQuery, userPreferences, recommendedProducts, updateUserPreferences, isVoiceListening } = useShoppingContext();
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  
  // Simulated AI recommendation loading effect
  useEffect(() => {
    if (isVoiceListening) {
      setIsLoading(true);
    } else if (searchQuery) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [searchQuery, isVoiceListening]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    updateUserPreferences({ priceRange: { min: value[0], max: value[1] } });
  };
  
  const handleGenderChange = (gender: "Men" | "Women" | "Kids" | "Unisex") => {
    updateUserPreferences({ gender });
  };
  
  const handleFitChange = (fit: "Slim" | "Regular" | "Loose" | "Oversized") => {
    const currentFits = userPreferences.fit || [];
    const updatedFits = currentFits.includes(fit)
      ? currentFits.filter(f => f !== fit)
      : [...currentFits, fit];
      
    updateUserPreferences({ fit: updatedFits });
  };
  
  const handleCategoryChange = (category: string) => {
    const currentCategories = userPreferences.categories || [];
    const updatedCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
      
    updateUserPreferences({ categories: updatedCategories });
  };
  
  const categories = [
    "T-Shirts", "Shirts", "Jeans", "Pants", "Dresses", 
    "Jackets", "Sweaters", "Activewear", "Formal", "Accessories"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Smart Fit Finder</h1>
        <p className="text-center text-gray-600 mb-8">
          Tell us what you're looking for using your voice or the search box below. Try something like:
          <br />
          <span className="italic">"Show me slim fit cotton shirts for men under $50"</span> or{" "}
          <span className="italic">"Women's loose dresses in linen fabric"</span>
        </p>

        {/* Voice search bar */}
        <div className="mb-12">
          <VoiceSearchBar />
        </div>

        <div className="flex flex-col sm:flex-row gap-8">
          {/* Filters - Mobile */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 sm:hidden mb-4">
                <Sliders className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="h-full py-6 pr-6 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Refine Results</h3>
                {renderFilters()}
                
                <div className="mt-8">
                  <SheetClose asChild>
                    <Button className="w-full">Apply Filters</Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Filters - Desktop */}
          <div className="hidden sm:block w-64 flex-shrink-0">
            <div className="sticky top-24 pr-4">
              <h3 className="text-lg font-semibold mb-4">Refine Results</h3>
              {renderFilters()}
            </div>
          </div>
          
          {/* Product results */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-lg font-medium">Finding your perfect match...</p>
                <p className="text-sm text-gray-500">Our AI is analyzing your preferences</p>
              </div>
            ) : (
              <ProductGrid />
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  function renderFilters() {
    return (
      <Accordion type="multiple" defaultValue={["gender", "price"]}>
        <AccordionItem value="gender">
          <AccordionTrigger>Gender</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              {["Men", "Women", "Kids", "Unisex"].map((gender) => (
                <div key={gender} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`gender-${gender}`} 
                    checked={userPreferences.gender === gender}
                    onCheckedChange={() => handleGenderChange(gender as any)}
                  />
                  <Label htmlFor={`gender-${gender}`}>{gender}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="px-1">
              <Slider 
                defaultValue={[0, 200]} 
                max={500} 
                step={10} 
                value={priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between mt-2 text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="fit">
          <AccordionTrigger>Fit</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              {["Slim", "Regular", "Loose", "Oversized"].map((fit) => (
                <div key={fit} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`fit-${fit}`} 
                    checked={(userPreferences.fit || []).includes(fit as any)}
                    onCheckedChange={() => handleFitChange(fit as any)}
                  />
                  <Label htmlFor={`fit-${fit}`}>{fit}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={(userPreferences.categories || []).includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }
};

// Create a wrapper component that includes the Layout
const ProductFinderPage = () => (
  <Layout>
    <ProductFinder />
  </Layout>
);

export default ProductFinderPage;
