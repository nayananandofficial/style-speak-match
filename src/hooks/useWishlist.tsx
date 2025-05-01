
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Product } from "@/services/productService";
import { toast } from "sonner";

export interface WishlistItem {
  id: string;
  product: Product;
}

export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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

  return {
    wishlistItems,
    loading,
    handleRemoveFromWishlist
  };
};
