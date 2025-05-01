
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const LoginRequired = () => {
  return (
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
  );
};

export default LoginRequired;
