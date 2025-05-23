
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Heart, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import { useAuth } from "@/contexts/AuthContext";
import VoiceSearchBar from "./VoiceSearchBar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const { cart } = useShoppingContext();
  const { user, profile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const categories = [
    { name: "Men", path: "/category/men" },
    { name: "Women", path: "/category/women" },
    { name: "Kids", path: "/category/kids" },
    { name: "Sale", path: "/sale" },
  ];

  const userLinks = [
    { name: "Profile", path: "/profile", icon: User },
    { name: "Wishlist", path: "/wishlist", icon: Heart },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
  ];
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

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
            <Link 
              to="/finder" 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Smart Finder
            </Link>
          </nav>
          
          {/* Right actions */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="hidden sm:flex items-center text-sm font-medium hover:text-primary transition-colors">
              <Heart size={20} className="mr-1" />
              <span className="hidden md:inline">Wishlist</span>
            </Link>
            
            {user ? (
              <div className="hidden sm:flex items-center text-sm font-medium hover:text-primary transition-colors">
                <Link to="/profile" className="flex items-center">
                  <User size={20} className="mr-1" />
                  <span className="hidden md:inline">
                    {profile?.first_name || 'Account'}
                  </span>
                </Link>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center text-sm font-medium hover:text-primary transition-colors">
                <User size={20} className="mr-1" />
                <span className="hidden md:inline">Login</span>
              </Link>
            )}
            
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
                    <Link
                      to="/finder"
                      className="text-base font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Smart Finder
                    </Link>
                    <div className="h-px bg-border my-2"></div>
                    
                    {user ? (
                      <>
                        {userLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.path}
                            className="flex items-center text-base font-medium hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <link.icon size={18} className="mr-2" />
                            {link.name}
                          </Link>
                        ))}
                        <button
                          className="flex items-center text-base font-medium hover:text-primary transition-colors"
                          onClick={() => {
                            setIsMenuOpen(false);
                            handleSignOut();
                          }}
                        >
                          <LogOut size={18} className="mr-2" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="flex items-center text-base font-medium hover:text-primary transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <User size={18} className="mr-2" />
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="flex items-center text-base font-medium hover:text-primary transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <User size={18} className="mr-2" />
                          Sign Up
                        </Link>
                      </>
                    )}
                    
                    <div className="h-px bg-border my-2"></div>
                    <Link
                      to="/about"
                      className="text-base font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link
                      to="/faq"
                      className="text-base font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      FAQ
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
