
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import VoiceSearchBar from "./VoiceSearchBar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const { cart } = useShoppingContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const categories = [
    { name: "Men", path: "/category/men" },
    { name: "Women", path: "/category/women" },
    { name: "Kids", path: "/category/kids" },
    { name: "Sale", path: "/sale" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-fitvogue-purple to-fitvogue-teal bg-clip-text text-transparent">
              FitVogue
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>
          
          {/* Right actions */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="hidden sm:flex items-center text-sm font-medium hover:text-primary transition-colors">
              <Heart size={20} className="mr-1" />
              <span className="hidden md:inline">Wishlist</span>
            </Link>
            
            <Link to="/account" className="hidden sm:flex items-center text-sm font-medium hover:text-primary transition-colors">
              <User size={20} className="mr-1" />
              <span className="hidden md:inline">Account</span>
            </Link>
            
            <Link to="/cart" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
              <div className="relative">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden md:inline ml-1">Cart</span>
            </Link>
            
            {/* Mobile menu button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col h-full py-6">
                  <h2 className="text-lg font-bold mb-6 bg-gradient-to-r from-fitvogue-purple to-fitvogue-teal bg-clip-text text-transparent">
                    FitVogue
                  </h2>
                  <nav className="flex flex-col space-y-4">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="text-base font-medium hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                    <div className="h-px bg-border my-2"></div>
                    <Link
                      to="/wishlist"
                      className="flex items-center text-base font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Heart size={18} className="mr-2" />
                      Wishlist
                    </Link>
                    <Link
                      to="/account"
                      className="flex items-center text-base font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={18} className="mr-2" />
                      Account
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mt-4">
          <VoiceSearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
