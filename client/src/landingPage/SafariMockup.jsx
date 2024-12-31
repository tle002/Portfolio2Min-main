import Safari from "../../components/ui/safari";
import Portfolio2MinLaptopMockup from "../assets/Portfolio2Min-Laptop-Device-Pic.png";

export function SafariMockup() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
        Transform Your Ideas into Stunning Portfolios in Minutes!
        </h1>
        
        <div className="relative rounded-lg shadow-2xl overflow-hidden">
          <Safari 
            url="portfolio2min" 
            className="w-full h-auto aspect-[16/10]"
            src={Portfolio2MinLaptopMockup}
            alt="Portfolio2Min Website Preview"
          />
          
          {/* Optional decorative elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl" />
        </div>
      </div>
    </div>
  );
}