
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { useQuery } from "@tanstack/react-query";
import { getSaleProducts } from "@/services/productService";
import { Skeleton } from "@/components/ui/skeleton";

const SalePage = () => {
  const { data: saleProducts, isLoading } = useQuery({
    queryKey: ['products', 'sale'],
    queryFn: () => getSaleProducts()
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 py-10 px-6 mb-8 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-2 text-red-600">Sale</h1>
          <p className="text-xl text-gray-700 mb-4">Up to 70% Off Selected Items</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-60 w-full rounded-lg" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid onSale={true} />
        )}
      </div>
    </Layout>
  );
};

export default SalePage;
