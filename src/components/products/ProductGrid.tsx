
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product, getProducts, getProductsByGender, getSaleProducts } from "@/services/productService";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
  featured?: boolean;
  onSale?: boolean;
  limit?: number;
  category?: string;
}

const ProductGrid = ({ featured = false, onSale = false, limit, category }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { gender } = useParams<{ gender: string }>();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let fetchedProducts: Product[] = [];

        if (gender) {
          fetchedProducts = await getProductsByGender(gender);
        } else if (onSale) {
          fetchedProducts = await getSaleProducts();
        } else {
          fetchedProducts = await getProducts({ 
            featured, 
            category,
            // Add more filters as needed
          });
        }

        // Apply limit if provided
        if (limit && fetchedProducts.length > limit) {
          fetchedProducts = fetchedProducts.slice(0, limit);
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [featured, gender, onSale, limit, category]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-60 w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium">No products found</h2>
        <p className="text-muted-foreground mt-1">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
