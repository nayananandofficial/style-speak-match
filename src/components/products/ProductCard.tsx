
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/services/productService";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useShoppingContext();
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Format the price with a currency symbol
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price);
  
  // Format sale price if available
  const formattedSalePrice = product.sale_price 
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(product.sale_price)
    : null;
  
  const handleAddToCart = () => {
    // Set default values for size and color
    const defaultSize = product.sizes[0] || "";
    const defaultColor = product.colors[0] || "";
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.sale_price || product.price,
      image: product.images[0] || "",
      size: defaultSize,
      color: defaultColor,
      quantity: 1
    });
    
    toast.success(`${product.name} added to cart`);
  };
  
  const toggleWishlist = async () => {
    if (!user) {
      toast.error("Please log in to add items to your wishlist");
      return;
    }
    
    try {
      if (isWishlisted) {
        // Remove from wishlist
        const { error } = await supabase
          .from("wishlists")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", product.id);
          
        if (error) throw error;
        
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        // Add to wishlist
        const { error } = await supabase
          .from("wishlists")
          .insert({ user_id: user.id, product_id: product.id });
          
        if (error) {
          if (error.code === "23505") {
            toast.error("This item is already in your wishlist");
          } else {
            throw error;
          }
        } else {
          setIsWishlisted(true);
          toast.success("Added to wishlist");
        }
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist");
    }
  };
  
  // Check if item is in wishlist when component mounts
  useEffect(() => {
    if (user) {
      const checkWishlist = async () => {
        const { data, error } = await supabase
          .from("wishlists")
          .select("*")
          .eq("user_id", user.id)
          .eq("product_id", product.id)
          .single();
          
        if (!error && data) {
          setIsWishlisted(true);
        }
      };
      
      checkWishlist();
    }
  }, [user, product.id]);

  return (
    <div className="group">
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.images[0] || "/placeholder.svg"} 
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        
        {product.sale_price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            Sale
          </div>
        )}
        
        <Button
          onClick={toggleWishlist}
          size="icon"
          variant="ghost"
          className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
            isWishlisted ? 'text-red-500' : 'text-gray-600'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          <span className="sr-only">Add to wishlist</span>
        </Button>
      </div>
      
      <div className="mt-3 space-y-1 text-sm">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900">{product.name}</h3>
        </Link>
        
        <div className="flex items-center space-x-2">
          {formattedSalePrice ? (
            <>
              <p className="font-medium text-red-600">{formattedSalePrice}</p>
              <p className="text-muted-foreground line-through">{formattedPrice}</p>
            </>
          ) : (
            <p className="font-medium text-gray-900">{formattedPrice}</p>
          )}
        </div>
        
        <Button 
          onClick={handleAddToCart}
          size="sm" 
          className="w-full mt-2"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
