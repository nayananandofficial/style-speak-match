
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useParams } from "react-router-dom";
import ProductGrid from "@/components/products/ProductGrid";
import { useQuery } from "@tanstack/react-query";
import { getProductsByGender } from "@/services/productService";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const CategoryPage = () => {
  const { gender } = useParams<{ gender: string }>();
  
  // Category filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const categoryOptions = [
    { id: 'shirts', label: 'Shirts' },
    { id: 'pants', label: 'Pants' },
    { id: 'dresses', label: 'Dresses' },
    { id: 'activewear', label: 'Activewear' },
    { id: 'hoodies', label: 'Hoodies & Sweatshirts' }
  ];
  
  const priceOptions = [
    { id: 'under25', label: 'Under $25' },
    { id: '25to50', label: '$25 to $50' },
    { id: '50to100', label: '$50 to $100' },
    { id: 'over100', label: 'Over $100' }
  ];
  
  // Fetch products based on gender
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', gender],
    queryFn: () => gender ? getProductsByGender(gender) : [],
    enabled: !!gender
  });

  const displayTitle = gender ? `${gender.charAt(0).toUpperCase() + gender.slice(1)} Collection` : "Products";
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 capitalize">
          {displayTitle}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="hidden md:block md:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-3">Categories</h2>
                <div className="space-y-2">
                  {categoryOptions.map(category => (
                    <div key={category.id} className="flex items-center">
                      <Button
                        variant="ghost"
                        className={`justify-start p-2 h-auto text-sm w-full ${
                          selectedCategories.includes(category.id) 
                            ? 'bg-primary/10 text-primary' 
                            : ''
                        }`}
                        onClick={() => toggleCategory(category.id)}
                      >
                        {category.label}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium mb-3">Price</h2>
                <div className="space-y-2">
                  {priceOptions.map(option => (
                    <div key={option.id} className="flex items-center">
                      <Button
                        variant="ghost"
                        className="justify-start p-2 h-auto text-sm w-full"
                      >
                        {option.label}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-9">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-60 w-full rounded-lg" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : (
              <ProductGrid />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
