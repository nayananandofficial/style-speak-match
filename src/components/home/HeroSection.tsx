
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-fitvogue-light-purple via-white to-fitvogue-light-teal overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block">Find Your</span>
              <span className="block bg-gradient-to-r from-fitvogue-purple to-fitvogue-teal bg-clip-text text-transparent">
                Perfect Fit
              </span>
              <span className="block">with AI</span>
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Speak or type your style preferences, measurements, and budget.
              Our AI finds clothes that fit you perfectly.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="gap-2 bg-fitvogue-purple hover:bg-fitvogue-purple/90">
                <Link to="/finder">
                  <Mic className="h-5 w-5" />
                  <span>Try Voice Search</span>
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link to="/category/all">
                  <span>Browse Collection</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block relative h-full min-h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 bg-fitvogue-teal/10 rounded-full flex items-center justify-center">
                <div className="w-56 h-56 bg-fitvogue-purple/10 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 bg-fitvogue-teal/20 rounded-full"></div>
                </div>
              </div>
              <img 
                src="https://placehold.co/500x650/e2e8f0/1e293b?text=Fashion+Model" 
                alt="Fashion model showing perfect fit" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
