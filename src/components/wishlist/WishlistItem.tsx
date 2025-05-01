
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/services/productService";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { toast } from "sonner";

interface WishlistItemProps {
  id: string;
  product: Product;
  onRemove: (wishlistItemId: string) => void;
}

const WishlistItem = ({ id, product, onRemove }: WishlistItemProps) => {
  const { addToCart } = useShoppingContext();

  const handleAddToCart = () => {
    // Set default values for size and color
    const defaultSize = product.sizes[0] || "";
    const defaultColor = product.colors[0] || "";
    
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.sale_price || product.price,
        images: [product.images[0] || ""],
        quantity: 1
      },
      1, // quantity
      defaultSize, // size
      defaultColor // color
    );
    
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="aspect-square relative">
        <img 
          src={product.images[0] || "/placeholder.svg"} 
          alt={product.name} 
          className="w-full h-full object-cover" 
        />
        <Button 
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
          onClick={() => onRemove(id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="font-medium hover:underline">
          {product.name}
        </Link>
        <div className="flex items-center space-x-2 mt-1 mb-4">
          {product.sale_price ? (
            <>
              <p className="font-semibold text-red-600">
                ${product.sale_price.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="font-semibold">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default WishlistItem;
