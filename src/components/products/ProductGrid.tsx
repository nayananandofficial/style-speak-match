
import { useState } from "react";
import ProductCard from "./ProductCard";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProductGrid = () => {
  const { recommendedProducts, products } = useShoppingContext();
  const [sortOption, setSortOption] = useState("recommended");
  
  const displayProducts = recommendedProducts.length > 0 ? recommendedProducts : products;
  
  // Sort products
  const sortedProducts = [...displayProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low-to-high":
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case "price-high-to-low":
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case "newest":
        // This would use a timestamp in a real app
        return Math.random() - 0.5;
      case "recommended":
      default:
        // Sort by confidence score if available, or random
        if (a.confidence && b.confidence) {
          return b.confidence - a.confidence;
        }
        return 0;
    }
  });

  return (
    <div className="w-full">
      {/* Sorting and filters */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold">
            {recommendedProducts.length > 0 ? "Recommended for You" : "All Products"}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({sortedProducts.length} products)
            </span>
          </h2>
        </div>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value)}
          >
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low-to-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-to-low">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid of products */}
      <div className="product-grid">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load more button */}
      {sortedProducts.length > 0 && (
        <div className="mt-12 text-center">
          <Button variant="outline">Load more</Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
