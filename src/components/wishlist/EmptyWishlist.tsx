
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyWishlist = () => {
  return (
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
  );
};

export default EmptyWishlist;
