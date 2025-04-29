
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Men's Collection",
    description: "Discover the latest styles for men",
    image: "https://placehold.co/800x900/e2e8f0/1e293b?text=Men's+Collection",
    path: "/category/men",
  },
  {
    name: "Women's Collection",
    description: "Explore our women's fashion selection",
    image: "https://placehold.co/800x900/e2e8f0/1e293b?text=Women's+Collection",
    path: "/category/women",
  },
  {
    name: "Kid's Collection",
    description: "Adorable outfits for the little ones",
    image: "https://placehold.co/800x900/e2e8f0/1e293b?text=Kid's+Collection",
    path: "/category/kids",
  },
];

const CategorySection = () => {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Shop By Category</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
                <p className="mt-1 text-sm text-white/80">{category.description}</p>
                <div className="mt-4">
                  <Button asChild variant="secondary" className="bg-white text-gray-900 hover:bg-white/90">
                    <Link to={category.path}>Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
