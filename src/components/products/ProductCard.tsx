
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { toast } from "sonner";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    salePrice?: number;
    images: string[];
    bestFit?: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useShoppingContext();
  const [isWishlist, setIsWishlist] = useState(false);
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlist(!isWishlist);
    toast.success(isWishlist ? "Removed from wishlist" : "Added to wishlist");
  };
  
  const handleAddToCart = () => {
    addToCart(product, 1, "M", "Default"); // Default size and color for simplicity
    toast.success(`${product.name} added to cart`);
  };
  
  const discountPercentage = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;
    
  return (
    <div className="group relative animate-fade-in">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-gray-100 rounded-md">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist Button */}
        <button
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 transition-colors"
          onClick={handleWishlist}
        >
          <Heart className={`h-5 w-5 ${isWishlist ? "fill-red-500 text-red-500" : ""}`} />
        </button>
        
        {/* Sale Badge */}
        {product.salePrice && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-red-500 hover:bg-red-600">-{discountPercentage}%</Badge>
          </div>
        )}
        
        {/* AI Best Fit Badge */}
        {product.bestFit && (
          <div className="absolute bottom-3 left-3 right-3">
            <Badge className="w-full justify-center bg-fitvogue-purple hover:bg-fitvogue-purple/90 text-white">
              Best Fit for You
            </Badge>
          </div>
        )}
      </Link>
      
      {/* Product Info */}
      <div className="mt-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xs text-gray-500">{product.brand}</p>
        <div className="mt-1 flex items-center">
          {product.salePrice ? (
            <>
              <span className="text-sm font-medium text-red-600">${product.salePrice.toFixed(2)}</span>
              <span className="ml-2 text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-sm font-medium">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
      
      {/* Quick Add Button - Appears on Hover */}
      <div className="absolute inset-x-0 bottom-0 mb-12 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="default" 
          size="sm" 
          className="w-full rounded-md bg-fitvogue-purple hover:bg-fitvogue-purple/90"
          onClick={handleAddToCart}
        >
          Quick Add
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
