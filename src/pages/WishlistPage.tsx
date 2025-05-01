
import React from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import LoginRequired from "@/components/wishlist/LoginRequired";
import EmptyWishlist from "@/components/wishlist/EmptyWishlist";
import WishlistSkeleton from "@/components/wishlist/WishlistSkeleton";
import WishlistItem from "@/components/wishlist/WishlistItem";
import { useWishlist } from "@/hooks/useWishlist";

const WishlistPage = () => {
  const { user } = useAuth();
  const { wishlistItems, loading, handleRemoveFromWishlist } = useWishlist();

  if (!user) {
    return (
      <Layout>
        <LoginRequired />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        {loading ? (
          <WishlistSkeleton />
        ) : wishlistItems.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map(item => (
              <WishlistItem 
                key={item.id} 
                id={item.id} 
                product={item.product} 
                onRemove={handleRemoveFromWishlist} 
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
