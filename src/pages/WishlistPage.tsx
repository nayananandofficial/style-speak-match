
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash, Heart } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { Product } from "@/services/productService";
import { Skeleton } from "@/components/ui/skeleton";

interface WishlistItem {
  id: string;
  product: Product;
}

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart } = useShoppingContext();

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (!user) {
        setWishlistItems([]);
        setLoading(false);
        return;
      }
      
      try {
        // Get wishlist items with product details
        const { data, error } = await supabase
          .from("wishlists")
          .select(`
            id,
            product_id,
            products (*)
          `)
          .eq("user_id", user.id);
        
        if (error) throw error;
        
        const formattedItems: WishlistItem[] = data.map(item => ({
          id: item.id,
          // Fix the type issue by adding type assertion
          product: item.products as unknown as Product
        }));
        
        setWishlistItems(formattedItems);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Failed to load wishlist items");
      } finally {
        setLoading(false);
      }
    };
    
    fetchWishlistItems();
  }, [user]);

  const handleRemoveFromWishlist = async (wishlistItemId: string) => {
    try {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("id", wishlistItemId);
      
      if (error) throw error;
      
      // Update local state
      setWishlistItems(prevItems => 
        prevItems.filter(item => item.id !== wishlistItemId)
      );
      
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
  };

  const handleAddToCart = (product: Product) => {
    // Set default values for size and color
    const defaultSize = product.sizes[0] || "";
    const defaultColor = product.colors[0] || "";
    
    // Fix: Pass all 4 required arguments to addToCart and correct property names
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.sale_price || product.price,
        images: [product.images[0] || ""], // Fix: Changed 'image' to 'images' array
        size: defaultSize,
        color: defaultColor,
        quantity: 1
      },
      1, // quantity
      defaultSize, // size
      defaultColor // color
    );
    
    toast.success(`${product.name} added to cart`);
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-muted inline-flex rounded-full p-6 mb-6">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Please log in to view your wishlist</h2>
          <p className="text-muted-foreground mb-6">
            Log in to save your favorite items.
          </p>
          <Button asChild size="lg">
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden bg-white">
                <Skeleton className="w-full aspect-square" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-muted inline-flex rounded-full p-6 mb-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Items added to your wishlist will appear here.
            </p>
            <Button asChild size="lg">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map(item => (
              <div key={item.id} className="border rounded-lg overflow-hidden bg-white">
                <div className="aspect-square relative">
                  <img 
                    src={item.product.images[0] || "/placeholder.svg"} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover" 
                  />
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-4">
                  <Link to={`/product/${item.product.id}`} className="font-medium hover:underline">
                    {item.product.name}
                  </Link>
                  <div className="flex items-center space-x-2 mt-1 mb-4">
                    {item.product.sale_price ? (
                      <>
                        <p className="font-semibold text-red-600">
                          ${item.product.sale_price.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground line-through">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="font-semibold">
                        ${item.product.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(item.product)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
