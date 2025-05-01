
import Layout from "@/components/Layout";
import ProductGrid from "@/components/products/ProductGrid";

const SalePage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 py-10 px-6 mb-8 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-2 text-red-600">Sale</h1>
          <p className="text-xl text-gray-700 mb-4">Up to 70% Off Selected Items</p>
        </div>
        
        <ProductGrid />
      </div>
    </Layout>
  );
};

export default SalePage;
