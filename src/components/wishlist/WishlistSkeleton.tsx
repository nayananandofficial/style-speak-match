
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const WishlistSkeleton = () => {
  return (
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
  );
};

export default WishlistSkeleton;
