
import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  
  // This is placeholder data that would typically come from a database
  const product = {
    id: id || "1",
    name: "Classic Fit Cotton Shirt",
    brand: "FitVogue",
    price: 49.99,
    salePrice: 39.99,
    description: "This classic fit cotton shirt is perfect for any occasion. Made with high-quality cotton for comfort and durability.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Blue", "Navy"],
    fabric: "100% Cotton",
    fit: "Classic",
    images: [
      "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&q=80&w=800",
    ],
    rating: 4.5,
    reviews: 128,
  };
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    
    toast.success("Added to cart!");
  };
  
  const handleAddToWishlist = () => {
    toast.success("Added to wishlist!");
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 2}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">{product.brand}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            
            <div>
              {product.salePrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">${product.salePrice}</span>
                  <span className="text-muted-foreground line-through">${product.price}</span>
                  <span className="bg-red-100 text-red-600 px-2 py-0.5 text-xs font-medium rounded">
                    SALE
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">${product.price}</span>
              )}
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={selectedSize === size ? "default" : "outline"}
                    className="h-10 px-4"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    type="button"
                    variant={selectedColor === color ? "default" : "outline"}
                    className="h-10 px-4"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Details</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Fabric: {product.fabric}</li>
                <li>Fit: {product.fit}</li>
              </ul>
            </div>
            
            <div className="flex gap-4">
              <Button 
                className="flex-1" 
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleAddToWishlist}
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
