import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Star, 
  Tag, 
  Users, 
  Leaf, 
  Gift, 
  Clock,
  Sparkles
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="cosmic-bg min-h-screen py-12">
      <Helmet>
        <title>Features | ELEV8</title>
        <meta name="description" content="Discover the special features and benefits of shopping with ELEV8. From secure payments to free shipping and easy returns, we make fashion shopping simple." />
      </Helmet>

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-12 font-space">OUR FEATURES</h1>
        
        {/* Hero Banner */}
        <div className="relative w-full h-80 mb-16 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4 font-space">ELEVATE YOUR SHOPPING EXPERIENCE</h2>
            <p className="text-gray-300 max-w-3xl text-lg mb-6">
              At ELEV8, we've designed every aspect of our service to provide you with an exceptional shopping experience.
              Discover why customers choose us for their fashion needs.
            </p>
            <Button className="bg-white text-black hover:bg-gray-200 font-medium">
              Start Shopping
            </Button>
          </div>
        </div>
        
        {/* Primary Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={<Truck />}
            title="Free Shipping"
            description="Enjoy free shipping on all orders within India. Fast delivery right to your doorstep."
          />
          
          <FeatureCard 
            icon={<CreditCard />}
            title="Secure Payment"
            description="Shop with confidence using our secure payment options. We support all major credit cards and cash on delivery."
          />
          
          <FeatureCard 
            icon={<ShieldCheck />}
            title="Easy Returns"
            description="Not satisfied? Return any item within 30 days for a full refund or exchange."
          />
          
          <FeatureCard 
            icon={<Tag />}
            title="Exclusive Deals"
            description="Get access to member-only discounts and special promotional offers throughout the year."
          />
          
          <FeatureCard 
            icon={<Star />}
            title="Quality Guarantee"
            description="All our products meet rigorous quality standards to ensure your satisfaction."
          />
          
          <FeatureCard 
            icon={<Users />}
            title="Dedicated Support"
            description="Our customer service team is available 7 days a week to assist with any questions or concerns."
          />
        </div>
        
        {/* Sustainability Section */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <Leaf className="h-16 w-16 text-green-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Sustainable Fashion</h2>
              <p className="text-gray-300 mb-4">
                We're committed to reducing our environmental footprint. Our packaging is made from recycled materials,
                and we're continuously working to source more sustainable fabrics and production methods.
              </p>
              <div className="flex space-x-4">
                <div className="bg-black/40 px-4 py-2 rounded text-center">
                  <p className="text-white font-bold text-2xl">30%</p>
                  <p className="text-gray-400 text-sm">Recycled Materials</p>
                </div>
                <div className="bg-black/40 px-4 py-2 rounded text-center">
                  <p className="text-white font-bold text-2xl">50%</p>
                  <p className="text-gray-400 text-sm">Less Water Usage</p>
                </div>
                <div className="bg-black/40 px-4 py-2 rounded text-center">
                  <p className="text-white font-bold text-2xl">70%</p>
                  <p className="text-gray-400 text-sm">Less Carbon Footprint</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-black/20 h-80 rounded flex items-center justify-center">
              <p className="text-white text-xl font-medium">Sustainable Fashion Image</p>
            </div>
          </div>
        </div>
        
        {/* Additional Features */}
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Additional Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-6 flex items-start">
            <Gift className="h-10 w-10 text-pink-500 mr-4 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Gift Services</h3>
              <p className="text-gray-300">
                Add a personal touch to your gifts with our premium gift wrapping service. Include a custom message card for your loved ones.
              </p>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-6 flex items-start">
            <Clock className="h-10 w-10 text-pink-500 mr-4 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Express Delivery</h3>
              <p className="text-gray-300">
                Need something in a hurry? Choose our express delivery option to receive your order within 24 hours.
              </p>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-6 flex items-start">
            <Sparkles className="h-10 w-10 text-pink-500 mr-4 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Exclusive Collections</h3>
              <p className="text-gray-300">
                Be the first to shop our limited-edition designer collaborations and exclusive product drops.
              </p>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-6 flex items-start">
            <Users className="h-10 w-10 text-pink-500 mr-4 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Loyalty Program</h3>
              <p className="text-gray-300">
                Earn points with every purchase and redeem them for discounts, special offers, and exclusive items.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-pink-900/40 to-purple-900/40 backdrop-blur-sm rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience ELEV8?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Join thousands of satisfied customers who have transformed their style with ELEV8. Start shopping today and discover the difference.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-white text-black hover:bg-gray-200 font-medium">
              Browse Collection
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-white/10 p-6 h-full flex flex-col">
    <div className="bg-white/10 rounded-full p-4 w-14 h-14 flex items-center justify-center mb-4 text-pink-500">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 flex-grow">{description}</p>
  </div>
);