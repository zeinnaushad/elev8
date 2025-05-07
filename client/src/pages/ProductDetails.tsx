import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ChevronRight, Minus, Plus } from "lucide-react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Newsletter from "@/components/home/Newsletter";
import type { Product } from "@shared/schema";

interface ProductDetailsProps {
  slug: string;
}

const ProductDetails = ({ slug }: ProductDetailsProps) => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
  });

  const { data: categoryData } = useQuery<{ id: number; name: string; slug: string }>({
    queryKey: [
      `/api/categories/${product?.categoryId === 1 ? "women" : product?.categoryId === 2 ? "men" : "accessories"}`,
    ],
    enabled: !!product,
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} ${quantity === 1 ? "item" : "items"} of ${product.name} added to your cart.`,
      });
    }
  };

  const handleWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: "Item has been added to your wishlist.",
    });
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="h-[600px] w-full rounded-md" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <div className="flex space-x-4">
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-12 w-40" />
              <Skeleton className="h-12 w-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-8">The product you're looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    );
  }

  const categoryName = categoryData?.name || 
    (product.categoryId === 1 ? "Women" : product.categoryId === 2 ? "Men" : "Accessories");
  
  const categorySlug = categoryData?.slug || 
    (product.categoryId === 1 ? "women" : product.categoryId === 2 ? "men" : "accessories");

  return (
    <>
      <Helmet>
        <title>{`${product.name} - ${categoryName} | ELEV8`}</title>
        <meta 
          name="description" 
          content={`${product.description} Shop premium fashion at ELEV8 with worldwide shipping.`} 
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/category/${categorySlug}`}>{categoryName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="font-semibold">{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
              {product.isNew === 1 && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-accent text-white">New</Badge>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="font-montserrat font-semibold text-3xl">{product.name}</h1>
            
            <p className="text-2xl font-semibold text-pink-600">₹{Math.round(parseFloat(String(product.price)) * 83)}</p>
            
            <p className="text-neutral-600">{product.description}</p>
            
            <Separator />
            
            {/* Quantity Selection */}
            <div className="flex items-center space-x-6">
              <span className="font-medium">Quantity</span>
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none" 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none" 
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                className="flex-1 bg-primary hover:bg-accent text-white font-montserrat py-6 h-auto"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white py-6 h-auto"
                onClick={handleWishlist}
              >
                <Heart className="mr-2 h-5 w-5" /> Wishlist
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center text-sm">
                <span className="text-neutral-600 min-w-32">Category:</span>
                <Link href={`/category/${categorySlug}`}>
                  <a className="font-medium hover:text-accent transition-colors">{categoryName}</a>
                </Link>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-neutral-600 min-w-32">SKU:</span>
                <span className="font-medium">ELEV8-{product.id.toString().padStart(4, '0')}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="text-neutral-600 min-w-32">Availability:</span>
                <span className="font-medium text-green-600">In Stock</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <Separator className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-montserrat font-semibold text-xl mb-4">Product Details</h2>
              <p className="text-neutral-600 mb-4">{product.description}</p>
              <p className="text-neutral-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel
                ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl
                sit amet nisl.
              </p>
            </div>
            <div>
              <h2 className="font-montserrat font-semibold text-xl mb-4">Delivery & Returns</h2>
              <ul className="space-y-2 text-neutral-600">
                <li>Free worldwide shipping on orders over ₹12,450</li>
                <li>Express shipping available (2-3 business days)</li>
                <li>Standard shipping (5-7 business days)</li>
                <li>Free 30-day returns on all orders</li>
                <li>Read our full <a href="#" className="text-primary hover:text-accent underline">return policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* You May Also Like Section */}
      <div className="mt-16">
        <FeaturedProducts />
      </div>
      
      {/* Newsletter */}
      <Newsletter />
    </>
  );
};

export default ProductDetails;
