
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash, Heart } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  // This would come from a database in a real application
  const wishlistItems = [
    {
      id: "1",
      name: "Classic Fit Cotton Shirt",
      brand: "FitVogue",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "2",
      name: "Slim Fit Chino Pants",
      brand: "FitVogue",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
    }
  ];

  const handleRemoveFromWishlist = (itemId: string) => {
    toast.success("Item removed from wishlist");
  };

  const handleAddToCart = (itemId: string) => {
    toast.success("Item added to cart");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
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
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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
                  <Link to={`/product/${item.id}`} className="font-medium hover:underline">
                    {item.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">{item.brand}</p>
                  <p className="font-semibold mb-4">${item.price.toFixed(2)}</p>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(item.id)}
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
