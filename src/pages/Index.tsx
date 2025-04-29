
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CategorySection from "@/components/home/CategorySection";
import ProductGrid from "@/components/products/ProductGrid";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <CategorySection />
      
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <ProductGrid />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
