
import Layout from "@/components/Layout";
import { useParams } from "react-router-dom";
import ProductGrid from "@/components/products/ProductGrid";

const CategoryPage = () => {
  const { gender } = useParams<{ gender: string }>();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 capitalize">
          {gender || ""} Collection
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="hidden md:block md:col-span-3">
            <div className="sticky top-24">
              <h2 className="text-lg font-medium mb-4">Filters</h2>
              <p className="text-muted-foreground">
                Filter options will be implemented with database integration.
              </p>
            </div>
          </div>
          
          <div className="md:col-span-9">
            <ProductGrid />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
