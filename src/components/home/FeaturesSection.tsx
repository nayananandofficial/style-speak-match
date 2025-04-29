
import { Mic, PaintBucket, Ruler, ArrowUpDown, Zap, BarChart3 } from "lucide-react";

const features = [
  {
    name: "Voice Search",
    description: "Search for clothes using natural language voice commands",
    icon: Mic,
  },
  {
    name: "Style Preferences",
    description: "Tell us your style and get personalized recommendations",
    icon: PaintBucket,
  },
  {
    name: "Smart Size Matching",
    description: "Find your perfect size across different brands",
    icon: Ruler,
  },
  {
    name: "Price Range Control",
    description: "Filter by budget to see options that fit your wallet",
    icon: ArrowUpDown,
  },
  {
    name: "AI Confidence Score",
    description: "See how well each item matches your preferences",
    icon: Zap,
  },
  {
    name: "Fit Analytics",
    description: "Data-driven recommendations for the perfect fit",
    icon: BarChart3,
  },
];

const FeaturesSection = () => {
  return (
    <div className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Meet Your AI Stylist</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our platform combines AI, voice recognition, and fit analytics to find you clothes that truly fit your body and style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
