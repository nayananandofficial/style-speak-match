import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { Button } from "@/components/ui/button";
import { Trash, Minus, Plus, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// This is the actual Cart component that uses the shopping context
const CartContent = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useShoppingContext();
  const [promoCode, setPromoCode] = useState("");
  
  const subtotal = cart.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;
  
  const handleUpdateQuantity = (productId: string, currentQuantity: number, change: number) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    updateCartItemQuantity(productId, newQuantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast.success("Item removed from cart");
  };
  
  const handleApplyPromoCode = () => {
    toast.error("Invalid promo code");
    setPromoCode("");
  };
  
  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-muted inline-flex rounded-full p-6 mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild size="lg">
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:flex-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Cart Items ({cart.length})</h2>
                
                <div className="divide-y">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="py-6 flex flex-col sm:flex-row">
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-base font-medium">
                              <Link to={`/product/${item.product.id}`} className="hover:text-primary">
                                {item.product.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.brand}
                            </p>
                            <div className="mt-1 flex items-center text-sm">
                              <span className="mr-2">Size: {item.size}</span>
                              <span>Color: {item.color}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-base font-medium">
                              ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                            </p>
                            {item.product.salePrice && (
                              <p className="text-sm text-gray-500 line-through">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="h-8 px-2 text-red-600"
                          >
                            <Trash className="h-4 w-4 mr-1" />
                            <span>Remove</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Continue shopping */}
            <div className="mt-8">
              <Button variant="outline" asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyPromoCode}>Apply</Button>
                </div>
                
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Secure checkout powered by Stripe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// This is the wrapper component that ensures CartContent is inside Layout (which has ShoppingProvider)
const Cart = () => {
  return (
    <Layout>
      <CartContent />
    </Layout>
  );
};

export default Cart;
