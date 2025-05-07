import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@shared/schema";

type ProductCategory = "all" | "women" | "men" | "accessories";

const FeaturedProducts = () => {
  const [activeFilter, setActiveFilter] = useState<ProductCategory>("all");
  const { toast } = useToast();
  const { addToCart } = useCart();

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filterProducts = (products: Product[]) => {
    if (activeFilter === "all") return products;
    
    // Map categoryId to category slug
    const categoryMap: Record<number, ProductCategory> = {
      1: "women",
      2: "men",
      3: "accessories",
    };
    
    return products.filter(
      (product) => categoryMap[product.categoryId] === activeFilter
    );
  };

  const filteredProducts = products ? filterProducts(products) : [];

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: "Item has been added to your wishlist.",
    });
  };

  if (isLoading) {
    return (
      <section id="new-arrivals" className="py-16 px-4 cosmic-bg">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <Skeleton className="h-10 w-52 mb-4 md:mb-0 bg-gray-800" />
            <div className="flex space-x-4">
              {["All", "Women", "Men", "Accessories"].map((filter) => (
                <Skeleton key={filter} className="h-6 w-20 bg-gray-800" />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-96 w-full bg-gray-800" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !products) {
    return (
      <section id="new-arrivals" className="py-16 px-4 cosmic-bg">
        <div className="container mx-auto text-center">
          <h2 className="font-space font-semibold text-3xl md:text-4xl mb-4 text-white">Our Products</h2>
          <p className="text-gray-300 mb-8">Unable to load products. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="new-arrivals" className="py-16 px-4 cosmic-bg">
      <div className="container mx-auto star-shimmer">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-space font-semibold text-3xl md:text-4xl mb-6 md:mb-0 text-white"
          >
            Our Products
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex space-x-8"
          >
            <FilterButton
              active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            >
              SALE
            </FilterButton>
            <FilterButton
              active={activeFilter === "women"}
              onClick={() => setActiveFilter("women")}
            >
              HOT
            </FilterButton>
            <FilterButton
              active={activeFilter === "men"}
              onClick={() => setActiveFilter("men")}
            >
              NEW ARRIVALS
            </FilterButton>
            <FilterButton
              active={activeFilter === "accessories"}
              onClick={() => setActiveFilter("accessories")}
            >
              ACCESSORIES
            </FilterButton>
          </motion.div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={() => handleAddToCart(product)}
              onWishlist={handleWishlist}
            />
          ))}
        </div>
        
        {/* View More Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-2 border-white text-white font-space font-medium px-8 py-4 h-auto hover:bg-white hover:text-black rounded-none"
          >
            See All
          </Button>
        </div>
      </div>
    </section>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton = ({ active, onClick, children }: FilterButtonProps) => (
  <button
    className={`font-space font-medium tracking-wide transition-colors ${
      active ? "text-white" : "text-gray-400 hover:text-white"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: () => void;
  onWishlist: () => void;
}

const ProductCard = ({ product, index, onAddToCart, onWishlist }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="product-card overflow-hidden shadow-md transition-all duration-300 cosmic-section"
    >
      <div className="relative">
        <Link href={`/product/${product.slug}`}>
          <a>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
            />
          </a>
        </Link>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black bg-opacity-50 backdrop-blur-sm p-2 rounded-full hover:bg-accent hover:text-white transition-colors"
            onClick={onWishlist}
          >
            <Heart className="h-5 w-5 text-white" />
          </Button>
        </div>
        {product.isNew === 1 && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-pink-600 text-white font-space">New</Badge>
          </div>
        )}
      </div>
      <div className="p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h3 className="font-space font-medium text-lg mb-1 text-white hover:text-pink-400 transition-colors">
              {product.name}
            </h3>
          </a>
        </Link>
        <div className="flex items-center space-x-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-yellow-400 text-xs">★</span>
          ))}
          <span className="text-gray-400 text-xs ml-1">5.0</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-pink-400 font-space">₹{Math.round(parseFloat(String(product.price)) * 83)}</span>
          <Button
            variant="default"
            size="icon"
            className="bg-white text-black p-2 rounded-full hover:bg-pink-400 hover:text-white transition-colors"
            onClick={onAddToCart}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProducts;
