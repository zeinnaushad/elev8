import React, { useState, useEffect } from 'react';
import { Link, useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import Newsletter from '@/components/home/Newsletter';
import { Heart, ShoppingBag, Filter, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export default function ShopPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('newest');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
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

  // Helper function to check if a product belongs to a specific type
  const isProductOfType = (product: Product, type: string): boolean => {
    // This is a simplified implementation - in a real app, you would have product types in the database
    const productName = product.name.toLowerCase();
    const productDesc = product.description.toLowerCase();
    
    switch (type) {
      case 'dresses':
        return productName.includes('dress') || productDesc.includes('dress');
      case 'tops':
        return productName.includes('top') || productName.includes('shirt') || productDesc.includes('top');
      case 'bottoms':
        return (
          productName.includes('bottom') || 
          productName.includes('pant') || 
          productName.includes('jeans') || 
          productDesc.includes('bottom')
        );
      case 'jackets':
        return (
          productName.includes('jacket') || 
          productName.includes('coat') || 
          productDesc.includes('jacket') || 
          productDesc.includes('coat')
        );
      case 'shirts':
        return productName.includes('shirt') || productDesc.includes('shirt');
      case 'tshirts':
        return productName.includes('t-shirt') || productName.includes('tshirt') || productDesc.includes('t-shirt');
      case 'pants':
        return productName.includes('pant') || productName.includes('jeans') || productDesc.includes('pant');
      case 'suits':
        return productName.includes('suit') || productDesc.includes('suit');
      case 'bags':
        return productName.includes('bag') || productName.includes('handbag') || productDesc.includes('bag');
      case 'jewelry':
        return productName.includes('jewelry') || productName.includes('jewellery') || productDesc.includes('jewelry');
      case 'watches':
        return productName.includes('watch') || productDesc.includes('watch');
      case 'sunglasses':
        return productName.includes('sunglass') || productName.includes('glasses') || productDesc.includes('sunglass');
      default:
        return false;
    }
  };

  // Filter products by category and product type
  const filteredProducts = products.filter(product => {
    // Get the category of the product
    const category = categories.find(cat => cat.id === product.categoryId);
    
    // If no category is selected or the product matches the selected category
    const matchesCategory = !activeCategory || (category && category.slug === activeCategory);
    
    // If no product types are selected or the product matches at least one selected type
    const matchesType = selectedTypes.length === 0 || selectedTypes.some(type => isProductOfType(product, type));
    
    return matchesCategory && matchesType;
  });

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

  // Toggle product type selection
  const toggleProductType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveCategory(null);
    setSelectedTypes([]);
    setSortOption('newest');
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
            {activeCategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <span className="capitalize">{activeCategory}</span>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Shop Header */}
        <div className="mb-8">
          <h1 className="font-montserrat font-semibold text-3xl md:text-4xl">
            {activeCategory ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Collection` : 'Shop Collection'}
          </h1>
          <p className="text-neutral-600 mt-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <h2 className="font-montserrat font-medium text-xl mb-4">Categories</h2>
              
              <div className="space-y-6">
                {/* Category Buttons */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant={activeCategory === null ? "default" : "outline"}
                    className={activeCategory === null 
                      ? "bg-black text-white justify-start" 
                      : "bg-white text-black border-gray-300 justify-start hover:bg-gray-100"}
                    onClick={() => setActiveCategory(null)}
                  >
                    All Products
                  </Button>
                  
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.slug ? "default" : "outline"}
                      className={activeCategory === category.slug 
                        ? "bg-black text-white justify-start" 
                        : "bg-white text-black border-gray-300 justify-start hover:bg-gray-100"}
                      onClick={() => setActiveCategory(category.slug)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
                
                <Separator />
                
                {/* Product Type Filters */}
                <FilterSection title="Product Type">
                  <div className="space-y-2">
                    {/* Women's Products */}
                    {(!activeCategory || activeCategory === "women") && (
                      <>
                        <h3 className="text-sm font-medium mb-2 text-gray-400">Women</h3>
                        <CheckboxItem 
                          id="type-dresses" 
                          label="Dresses" 
                          checked={selectedTypes.includes('dresses')} 
                          onCheckedChange={() => toggleProductType('dresses')} 
                        />
                        <CheckboxItem 
                          id="type-tops" 
                          label="Tops" 
                          checked={selectedTypes.includes('tops')} 
                          onCheckedChange={() => toggleProductType('tops')} 
                        />
                        <CheckboxItem 
                          id="type-bottoms" 
                          label="Bottoms" 
                          checked={selectedTypes.includes('bottoms')} 
                          onCheckedChange={() => toggleProductType('bottoms')} 
                        />
                        <CheckboxItem 
                          id="type-jackets" 
                          label="Jackets & Coats" 
                          checked={selectedTypes.includes('jackets')} 
                          onCheckedChange={() => toggleProductType('jackets')} 
                        />
                      </>
                    )}
                    
                    {/* Men's Products */}
                    {(!activeCategory || activeCategory === "men") && (
                      <>
                        <h3 className="text-sm font-medium mb-2 mt-4 text-gray-400">Men</h3>
                        <CheckboxItem 
                          id="type-shirts" 
                          label="Shirts" 
                          checked={selectedTypes.includes('shirts')} 
                          onCheckedChange={() => toggleProductType('shirts')} 
                        />
                        <CheckboxItem 
                          id="type-tshirts" 
                          label="T-Shirts" 
                          checked={selectedTypes.includes('tshirts')} 
                          onCheckedChange={() => toggleProductType('tshirts')} 
                        />
                        <CheckboxItem 
                          id="type-pants" 
                          label="Pants" 
                          checked={selectedTypes.includes('pants')} 
                          onCheckedChange={() => toggleProductType('pants')} 
                        />
                        <CheckboxItem 
                          id="type-suits" 
                          label="Suits" 
                          checked={selectedTypes.includes('suits')} 
                          onCheckedChange={() => toggleProductType('suits')} 
                        />
                      </>
                    )}
                    
                    {/* Accessories */}
                    {(!activeCategory || activeCategory === "accessories") && (
                      <>
                        <h3 className="text-sm font-medium mb-2 mt-4 text-gray-400">Accessories</h3>
                        <CheckboxItem 
                          id="type-bags" 
                          label="Bags" 
                          checked={selectedTypes.includes('bags')} 
                          onCheckedChange={() => toggleProductType('bags')} 
                        />
                        <CheckboxItem 
                          id="type-jewelry" 
                          label="Jewelry" 
                          checked={selectedTypes.includes('jewelry')} 
                          onCheckedChange={() => toggleProductType('jewelry')} 
                        />
                        <CheckboxItem 
                          id="type-watches" 
                          label="Watches" 
                          checked={selectedTypes.includes('watches')} 
                          onCheckedChange={() => toggleProductType('watches')} 
                        />
                        <CheckboxItem 
                          id="type-sunglasses" 
                          label="Sunglasses" 
                          checked={selectedTypes.includes('sunglasses')} 
                          onCheckedChange={() => toggleProductType('sunglasses')} 
                        />
                      </>
                    )}
                  </div>
                </FilterSection>
                
                <Separator />
                
                <FilterSection title="Price Range">
                  <div className="space-y-2">
                    <CheckboxItem id="price-0-50" label="₹0 - ₹4,150" />
                    <CheckboxItem id="price-50-100" label="₹4,150 - ₹8,300" />
                    <CheckboxItem id="price-100-200" label="₹8,300 - ₹16,600" />
                    <CheckboxItem id="price-200" label="₹16,600+" />
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
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={clearFilters}
                >
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
                    {/* Mobile Category Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={activeCategory === null ? "default" : "outline"}
                        className={activeCategory === null 
                          ? "bg-black text-white" 
                          : "bg-white text-black border-gray-300 hover:bg-gray-100"}
                        onClick={() => setActiveCategory(null)}
                      >
                        All
                      </Button>
                      
                      {categories.map(category => (
                        <Button
                          key={category.id}
                          size="sm"
                          variant={activeCategory === category.slug ? "default" : "outline"}
                          className={activeCategory === category.slug 
                            ? "bg-black text-white" 
                            : "bg-white text-black border-gray-300 hover:bg-gray-100"}
                          onClick={() => setActiveCategory(category.slug)}
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    {/* Mobile Product Type Filters */}
                    <FilterSection title="Product Type">
                      <div className="space-y-4">
                        {/* Women's Mobile Filters */}
                        {(!activeCategory || activeCategory === "women") && (
                          <div>
                            <h3 className="text-sm font-medium mb-2 text-gray-400">Women</h3>
                            <div className="grid grid-cols-2 gap-2">
                              <CheckboxItem 
                                id="m-type-dresses" 
                                label="Dresses" 
                                checked={selectedTypes.includes('dresses')} 
                                onCheckedChange={() => toggleProductType('dresses')} 
                              />
                              <CheckboxItem 
                                id="m-type-tops" 
                                label="Tops" 
                                checked={selectedTypes.includes('tops')} 
                                onCheckedChange={() => toggleProductType('tops')} 
                              />
                              <CheckboxItem 
                                id="m-type-bottoms" 
                                label="Bottoms" 
                                checked={selectedTypes.includes('bottoms')} 
                                onCheckedChange={() => toggleProductType('bottoms')} 
                              />
                              <CheckboxItem 
                                id="m-type-jackets" 
                                label="Jackets & Coats" 
                                checked={selectedTypes.includes('jackets')} 
                                onCheckedChange={() => toggleProductType('jackets')} 
                              />
                            </div>
                          </div>
                        )}
                        
                        {/* Men's Mobile Filters */}
                        {(!activeCategory || activeCategory === "men") && (
                          <div>
                            <h3 className="text-sm font-medium mb-2 text-gray-400">Men</h3>
                            <div className="grid grid-cols-2 gap-2">
                              <CheckboxItem 
                                id="m-type-shirts" 
                                label="Shirts" 
                                checked={selectedTypes.includes('shirts')} 
                                onCheckedChange={() => toggleProductType('shirts')} 
                              />
                              <CheckboxItem 
                                id="m-type-tshirts" 
                                label="T-Shirts" 
                                checked={selectedTypes.includes('tshirts')} 
                                onCheckedChange={() => toggleProductType('tshirts')} 
                              />
                              <CheckboxItem 
                                id="m-type-pants" 
                                label="Pants" 
                                checked={selectedTypes.includes('pants')} 
                                onCheckedChange={() => toggleProductType('pants')} 
                              />
                              <CheckboxItem 
                                id="m-type-suits" 
                                label="Suits" 
                                checked={selectedTypes.includes('suits')} 
                                onCheckedChange={() => toggleProductType('suits')} 
                              />
                            </div>
                          </div>
                        )}
                        
                        {/* Accessories Mobile Filters */}
                        {(!activeCategory || activeCategory === "accessories") && (
                          <div>
                            <h3 className="text-sm font-medium mb-2 text-gray-400">Accessories</h3>
                            <div className="grid grid-cols-2 gap-2">
                              <CheckboxItem 
                                id="m-type-bags" 
                                label="Bags" 
                                checked={selectedTypes.includes('bags')} 
                                onCheckedChange={() => toggleProductType('bags')} 
                              />
                              <CheckboxItem 
                                id="m-type-jewelry" 
                                label="Jewelry" 
                                checked={selectedTypes.includes('jewelry')} 
                                onCheckedChange={() => toggleProductType('jewelry')} 
                              />
                              <CheckboxItem 
                                id="m-type-watches" 
                                label="Watches" 
                                checked={selectedTypes.includes('watches')} 
                                onCheckedChange={() => toggleProductType('watches')} 
                              />
                              <CheckboxItem 
                                id="m-type-sunglasses" 
                                label="Sunglasses" 
                                checked={selectedTypes.includes('sunglasses')} 
                                onCheckedChange={() => toggleProductType('sunglasses')} 
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </FilterSection>
                    
                    <Separator />
                    
                    <FilterSection title="Price Range">
                      <div className="space-y-2">
                        <CheckboxItem id="m-price-0-50" label="₹0 - ₹4,150" />
                        <CheckboxItem id="m-price-50-100" label="₹4,150 - ₹8,300" />
                        <CheckboxItem id="m-price-100-200" label="₹8,300 - ₹16,600" />
                        <CheckboxItem id="m-price-200" label="₹16,600+" />
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
                    
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={clearFilters}
                    >
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
                  onClick={clearFilters}
                >
                  Clear Filters
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
                    toRupees={toRupees}
                    formatPrice={formatPrice}
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
}

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
  checked?: boolean;
  onCheckedChange?: () => void;
}

const CheckboxItem = ({ id, label, checked, onCheckedChange }: CheckboxItemProps) => (
  <div className="flex items-center space-x-2">
    <Checkbox 
      id={id} 
      checked={checked} 
      onCheckedChange={onCheckedChange} 
    />
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