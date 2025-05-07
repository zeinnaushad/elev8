import React, { useState, useEffect } from 'react';
import { Link, useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import Newsletter from '@/components/home/Newsletter';
import { Heart, ShoppingBag } from 'lucide-react';

export default function ShopPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('newest');
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await apiRequest('GET', '/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        });
      }
    };

    // Fetch products
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await apiRequest('GET', '/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, [toast]);

  // Filter products by category
  const filteredProducts = activeCategory
    ? products.filter(product => {
        const category = categories.find(cat => cat.id === product.categoryId);
        return category && category.slug === activeCategory;
      })
    : products;

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'newest') {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date();
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date();
      return dateB > dateA ? 1 : -1;
    } else if (sortOption === 'price-low') {
      return parseFloat(String(a.price)) - parseFloat(String(b.price));
    } else if (sortOption === 'price-high') {
      return parseFloat(String(b.price)) - parseFloat(String(a.price));
    }
    return 0;
  });

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

  return (
    <>
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span>Shop</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Shop Header */}
        <div className="mb-8">
          <h1 className="font-montserrat font-semibold text-3xl md:text-4xl">Shop Collection</h1>
          <p className="text-neutral-600 mt-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            variant={activeCategory === null ? "default" : "outline"}
            className="bg-white text-black border-gray-300 hover:bg-gray-100"
            onClick={() => setActiveCategory(null)}
          >
            All Products
          </Button>
          
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.slug ? "default" : "outline"}
              className={activeCategory === category.slug 
                ? "bg-black text-white hover:bg-gray-800" 
                : "bg-white text-black border-gray-300 hover:bg-gray-100"}
              onClick={() => setActiveCategory(category.slug)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* Sort and Results Count */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <p className="text-neutral-600">
            Showing {sortedProducts.length} {sortedProducts.length === 1 ? "result" : "results"}
          </p>
          
          <div className="w-full sm:w-auto">
            <select 
              className="border border-input bg-transparent rounded-md p-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Sort by: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-neutral-600">Loading products...</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-neutral-600 mb-4">
              We couldn't find any products that match your criteria.
            </p>
            <Button 
              variant="default" 
              onClick={() => setActiveCategory(null)}
            >
              View All Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onAddToCart={() => handleAddToCart(product)}
                onWishlist={handleWishlist}
                toRupees={toRupees}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Newsletter */}
      <Newsletter />
    </>
  );
}

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: () => void;
  onWishlist: () => void;
  toRupees: (price: number) => number;
  formatPrice: (price: number) => string;
}

const ProductCard = ({ 
  product, 
  index, 
  onAddToCart, 
  onWishlist,
  toRupees,
  formatPrice
}: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800"
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
            className="bg-black/70 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors"
            onClick={onWishlist}
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        {product.isNew === 1 && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-white text-black">New</Badge>
          </div>
        )}
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
          <span className="font-semibold text-pink-300">{formatPrice(toRupees(parseFloat(String(product.price))))}</span>
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