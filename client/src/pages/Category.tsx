import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Filter, ChevronDown, ChevronRight } from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import Newsletter from "@/components/home/Newsletter";
import type { Product, Category as CategoryType } from "@shared/schema";

interface CategoryProps {
  slug: string;
}

const Category = ({ slug }: CategoryProps) => {
  const [openFilter, setOpenFilter] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [sortOption, setSortOption] = useState("newest");

  const { data: category, isLoading: categoryLoading } = useQuery<CategoryType>({
    queryKey: [`/api/categories/${slug}`],
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const isLoading = categoryLoading || productsLoading;

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

  // Filter products by category
  const filteredProducts = products?.filter(
    (product) => 
      category && product.categoryId === category.id
  ) || [];

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOption === "price-low") {
      return parseFloat(String(a.price)) - parseFloat(String(b.price));
    } else if (sortOption === "price-high") {
      return parseFloat(String(b.price)) - parseFloat(String(a.price));
    }
    return 0;
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-6 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block">
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="md:col-span-3">
            <div className="mb-6">
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-96 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <p className="mb-8">The category you're looking for does not exist.</p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${category.name} Collection | LUXEMODE`}</title>
        <meta 
          name="description" 
          content={`Shop our premium ${category.name.toLowerCase()} collection at LUXEMODE. Discover the latest trends and timeless classics with worldwide shipping.`} 
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
              <BreadcrumbLink className="font-semibold">{category.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="font-montserrat font-semibold text-3xl md:text-4xl">{category.name} Collection</h1>
          <p className="text-neutral-600 mt-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <h2 className="font-montserrat font-medium text-xl mb-4">Filters</h2>
              
              <div className="space-y-6">
                <FilterSection title="Price Range">
                  <div className="space-y-2">
                    <CheckboxItem id="price-0-50" label="$0 - $50" />
                    <CheckboxItem id="price-50-100" label="$50 - $100" />
                    <CheckboxItem id="price-100-200" label="$100 - $200" />
                    <CheckboxItem id="price-200" label="$200+" />
                  </div>
                </FilterSection>
                
                <Separator />
                
                <FilterSection title="Product Type">
                  <div className="space-y-2">
                    {category.slug === "women" && (
                      <>
                        <CheckboxItem id="type-dresses" label="Dresses" />
                        <CheckboxItem id="type-tops" label="Tops" />
                        <CheckboxItem id="type-skirts" label="Skirts" />
                        <CheckboxItem id="type-jackets" label="Jackets & Coats" />
                      </>
                    )}
                    
                    {category.slug === "men" && (
                      <>
                        <CheckboxItem id="type-shirts" label="Shirts" />
                        <CheckboxItem id="type-tshirts" label="T-Shirts" />
                        <CheckboxItem id="type-pants" label="Pants" />
                        <CheckboxItem id="type-suits" label="Suits" />
                      </>
                    )}
                    
                    {category.slug === "accessories" && (
                      <>
                        <CheckboxItem id="type-bags" label="Bags" />
                        <CheckboxItem id="type-jewelry" label="Jewelry" />
                        <CheckboxItem id="type-watches" label="Watches" />
                        <CheckboxItem id="type-sunglasses" label="Sunglasses" />
                      </>
                    )}
                  </div>
                </FilterSection>
                
                <Separator />
                
                <FilterSection title="Size">
                  <div className="space-y-2">
                    <CheckboxItem id="size-xs" label="XS" />
                    <CheckboxItem id="size-s" label="S" />
                    <CheckboxItem id="size-m" label="M" />
                    <CheckboxItem id="size-l" label="L" />
                    <CheckboxItem id="size-xl" label="XL" />
                  </div>
                </FilterSection>
                
                <Separator />
                
                <Button className="w-full" variant="outline">
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="md:col-span-3">
            {/* Mobile Filter Button */}
            <div className="md:hidden mb-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-between"
                onClick={() => setOpenFilter(!openFilter)}
              >
                <span className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openFilter ? 'rotate-180' : ''}`} />
              </Button>
              
              <Collapsible open={openFilter} onOpenChange={setOpenFilter} className="mt-2">
                <CollapsibleContent className="p-4 border rounded-md">
                  <div className="space-y-6">
                    <FilterSection title="Price Range">
                      <div className="space-y-2">
                        <CheckboxItem id="m-price-0-50" label="$0 - $50" />
                        <CheckboxItem id="m-price-50-100" label="$50 - $100" />
                        <CheckboxItem id="m-price-100-200" label="$100 - $200" />
                        <CheckboxItem id="m-price-200" label="$200+" />
                      </div>
                    </FilterSection>
                    
                    <Separator />
                    
                    <FilterSection title="Product Type">
                      <div className="space-y-2">
                        {category.slug === "women" && (
                          <>
                            <CheckboxItem id="m-type-dresses" label="Dresses" />
                            <CheckboxItem id="m-type-tops" label="Tops" />
                            <CheckboxItem id="m-type-skirts" label="Skirts" />
                            <CheckboxItem id="m-type-jackets" label="Jackets & Coats" />
                          </>
                        )}
                        
                        {category.slug === "men" && (
                          <>
                            <CheckboxItem id="m-type-shirts" label="Shirts" />
                            <CheckboxItem id="m-type-tshirts" label="T-Shirts" />
                            <CheckboxItem id="m-type-pants" label="Pants" />
                            <CheckboxItem id="m-type-suits" label="Suits" />
                          </>
                        )}
                        
                        {category.slug === "accessories" && (
                          <>
                            <CheckboxItem id="m-type-bags" label="Bags" />
                            <CheckboxItem id="m-type-jewelry" label="Jewelry" />
                            <CheckboxItem id="m-type-watches" label="Watches" />
                            <CheckboxItem id="m-type-sunglasses" label="Sunglasses" />
                          </>
                        )}
                      </div>
                    </FilterSection>
                    
                    <Separator />
                    
                    <FilterSection title="Size">
                      <div className="space-y-2">
                        <CheckboxItem id="m-size-xs" label="XS" />
                        <CheckboxItem id="m-size-s" label="S" />
                        <CheckboxItem id="m-size-m" label="M" />
                        <CheckboxItem id="m-size-l" label="L" />
                        <CheckboxItem id="m-size-xl" label="XL" />
                      </div>
                    </FilterSection>
                    
                    <Separator />
                    
                    <Button className="w-full" variant="outline">
                      Clear All Filters
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
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
            
            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-neutral-600 mb-4">
                  We couldn't find any products that match your criteria.
                </p>
                <Button asChild>
                  <Link href="/">Browse All Products</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onAddToCart={() => handleAddToCart(product)}
                    onWishlist={handleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <Newsletter />
    </>
  );
};

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection = ({ title, children }: FilterSectionProps) => (
  <div>
    <h3 className="font-montserrat font-medium mb-3">{title}</h3>
    {children}
  </div>
);

interface CheckboxItemProps {
  id: string;
  label: string;
}

const CheckboxItem = ({ id, label }: CheckboxItemProps) => (
  <div className="flex items-center space-x-2">
    <Checkbox id={id} />
    <label htmlFor={id} className="text-sm cursor-pointer">
      {label}
    </label>
  </div>
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="product-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative">
        <Link href={`/product/${product.slug}`}>
          <a>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-72 object-cover"
            />
          </a>
        </Link>
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white p-2 rounded-full hover:bg-accent hover:text-white transition-colors"
            onClick={onWishlist}
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        {product.isNew === 1 && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-accent text-white">New</Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h3 className="font-montserrat font-medium text-lg mb-1 hover:text-accent transition-colors">
              {product.name}
            </h3>
          </a>
        </Link>
        <p className="text-neutral-500 text-sm mb-2">
          {product.description.length > 50
            ? `${product.description.substring(0, 50)}...`
            : product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-semibold">${parseFloat(String(product.price)).toFixed(2)}</span>
          <Button
            variant="default"
            size="icon"
            className="bg-primary text-white p-2 rounded-full hover:bg-accent transition-colors"
            onClick={onAddToCart}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Category;
