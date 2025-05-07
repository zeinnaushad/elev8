import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import Newsletter from '@/components/home/Newsletter';
import { Heart, ShoppingBag } from 'lucide-react';

export default function SalePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await apiRequest('GET', '/api/products');
        const data = await res.json();
        
        // Filter for sale products (this is a simulation - in a real app we would have a "sale" field in the database)
        // For demo purposes, we'll consider products older than 30 days as sale items
        const saleProducts = data.filter((product: Product) => {
          const productDate = new Date(product.createdAt);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return productDate < thirtyDaysAgo;
        });
        
        setProducts(saleProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load sale products",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const handleWishlist = () => {
    toast({
      title: "Wishlist",
      description: "Feature coming soon!",
    });
  };

  // Format price in rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Convert dollar price to rupees
  const toRupees = (price: number) => {
    return Math.round(price * 83);
  };

  // Calculate sale price (30% off)
  const calculateSalePrice = (price: number) => {
    return price * 0.7; // 30% off
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span>Sale</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Sale Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-montserrat font-bold mb-4 text-white">SEASONAL SALE</h1>
          <p className="text-pink-400 text-2xl font-semibold">Up to 30% off selected items</p>
          <div className="max-w-2xl mx-auto mt-6 text-neutral-300">
            <p>Limited time offer on selected styles from our collection. Shop now before they're gone!</p>
          </div>
        </div>
        
        {/* Sale Banner */}
        <div className="relative mb-12 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-700/70 to-purple-800/70 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80" 
            alt="Sale Banner" 
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">EXTRA 10% OFF</h2>
            <p className="text-xl mb-6">Use code: ELEV8EXTRA</p>
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-200 transition-colors"
              onClick={() => window.scrollTo({ top: document.getElementById('sale-products')?.offsetTop || 0, behavior: 'smooth' })}
            >
              Shop Now
            </Button>
          </div>
        </div>
        
        {/* Sale Products */}
        <div id="sale-products">
          <h2 className="text-3xl font-montserrat font-semibold mb-8">Sale Products</h2>
          
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-4 text-neutral-400">Loading sale products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-b from-gray-900 to-black rounded-lg border border-gray-800 px-4">
              <h3 className="text-xl font-medium mb-2">No sale products available</h3>
              <p className="text-neutral-400 mb-4">
                Check back soon for our upcoming sales!
              </p>
              <Button asChild>
                <Link href="/shop">Browse All Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <SaleProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={() => handleAddToCart(product)}
                  onWishlist={handleWishlist}
                  toRupees={toRupees}
                  formatPrice={formatPrice}
                  calculateSalePrice={calculateSalePrice}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Sale Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-medium mb-2 text-white">Free Shipping</h3>
            <p className="text-neutral-400">On all sale items over ₹1,000</p>
          </div>
          <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-medium mb-2 text-white">Easy Returns</h3>
            <p className="text-neutral-400">30-day return policy on all sale items</p>
          </div>
          <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-medium mb-2 text-white">Sale Ends Soon</h3>
            <p className="text-neutral-400">Limited time offer while stocks last</p>
          </div>
        </div>
      </div>
      
      <Newsletter />
    </>
  );
}

interface SaleProductCardProps {
  product: Product;
  index: number;
  onAddToCart: () => void;
  onWishlist: () => void;
  toRupees: (price: number) => number;
  formatPrice: (price: number) => string;
  calculateSalePrice: (price: number) => number;
}

const SaleProductCard = ({ 
  product, 
  index, 
  onAddToCart, 
  onWishlist,
  toRupees,
  formatPrice,
  calculateSalePrice
}: SaleProductCardProps) => {
  const originalPrice = toRupees(parseFloat(String(product.price)));
  const salePrice = calculateSalePrice(originalPrice);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800 relative"
    >
      {/* Sale Badge */}
      <div className="absolute top-4 left-4 z-10">
        <Badge className="bg-pink-600 text-white px-2 py-1">30% OFF</Badge>
      </div>
      
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
            className="bg-black/70 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors"
            onClick={onWishlist}
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="p-4 text-white">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h3 className="font-montserrat font-medium text-lg mb-1 hover:text-pink-300 transition-colors">
              {product.name}
            </h3>
          </a>
        </Link>
        <p className="text-gray-400 text-sm mb-3">
          {product.description.length > 50
            ? `${product.description.substring(0, 50)}...`
            : product.description}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold text-pink-300">{formatPrice(salePrice)}</span>
            <span className="text-gray-400 line-through ml-2 text-sm">{formatPrice(originalPrice)}</span>
          </div>
          <Button
            variant="default"
            size="icon"
            className="bg-white text-black p-2 rounded-full hover:bg-pink-300 transition-colors"
            onClick={onAddToCart}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};