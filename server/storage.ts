import { type Product, type InsertProduct, type Category, type InsertCategory, type CartItem, type InsertCartItem, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getNewArrivals(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart methods
  getCartItems(sessionId: string): Promise<CartItem[]>;
  getCartItem(id: number): Promise<CartItem | undefined>;
  getCartItemByProductAndSession(productId: number, sessionId: string): Promise<CartItem | undefined>;
  createCartItem(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  deleteCartItem(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  
  private userId: number;
  private categoryId: number;
  private productId: number;
  private cartItemId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    
    this.userId = 1;
    this.categoryId = 1;
    this.productId = 1;
    this.cartItemId = 1;
    
    this.initializeData();
  }

  // Initialize with sample data
  private initializeData() {
    // Create Categories
    const womenCategory = this.createCategory({
      name: "Women",
      slug: "women",
      imageUrl: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2"
    });
    
    const menCategory = this.createCategory({
      name: "Men",
      slug: "men",
      imageUrl: "https://images.unsplash.com/photo-1516826957135-700dedea698c"
    });
    
    const accessoriesCategory = this.createCategory({
      name: "Accessories",
      slug: "accessories",
      imageUrl: "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd"
    });

    // Create Products
    this.createProduct({
      name: "Wool Blend Coat",
      slug: "wool-blend-coat",
      description: "Premium quality wool blend coat for women. Perfect for winter.",
      price: "149.99",
      imageUrl: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f",
      categoryId: womenCategory.id,
      isNew: 1
    });

    this.createProduct({
      name: "Elegant Black Dress",
      slug: "elegant-black-dress",
      description: "Timeless elegant black dress for any occasion.",
      price: "89.99",
      imageUrl: "https://images.unsplash.com/photo-1550639525-c97d455acf70",
      categoryId: womenCategory.id,
      isNew: 0
    });

    this.createProduct({
      name: "Tailored Fit Blazer",
      slug: "tailored-fit-blazer",
      description: "Classic tailored blazer for a sophisticated look.",
      price: "129.99",
      imageUrl: "https://images.unsplash.com/photo-1617137968427-85924c800a22",
      categoryId: menCategory.id,
      isNew: 1
    });

    this.createProduct({
      name: "Premium Leather Bag",
      slug: "premium-leather-bag",
      description: "Handcrafted premium leather bag with elegant design.",
      price: "199.99",
      imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
      categoryId: accessoriesCategory.id,
      isNew: 0
    });

    this.createProduct({
      name: "Casual Button-Down",
      slug: "casual-button-down",
      description: "Comfortable casual button-down shirt for everyday wear.",
      price: "59.99",
      imageUrl: "https://images.unsplash.com/photo-1578932750355-5eb30ece487a",
      categoryId: menCategory.id,
      isNew: 0
    });

    this.createProduct({
      name: "Cashmere Sweater",
      slug: "cashmere-sweater",
      description: "Luxurious cashmere sweater for ultimate comfort and style.",
      price: "119.99",
      imageUrl: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5",
      categoryId: womenCategory.id,
      isNew: 1
    });

    this.createProduct({
      name: "Luxury Wristwatch",
      slug: "luxury-wristwatch",
      description: "Precision-crafted luxury wristwatch with elegant design.",
      price: "299.99",
      imageUrl: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
      categoryId: accessoriesCategory.id,
      isNew: 0
    });

    this.createProduct({
      name: "Slim Fit Jeans",
      slug: "slim-fit-jeans",
      description: "Modern slim fit jeans with perfect comfort and style.",
      price: "79.99",
      imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      categoryId: menCategory.id,
      isNew: 0
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug
    );
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId
    );
  }

  async getNewArrivals(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isNew === 1
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }

  async getCartItem(id: number): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }

  async getCartItemByProductAndSession(productId: number, sessionId: string): Promise<CartItem | undefined> {
    return Array.from(this.cartItems.values()).find(
      (item) => item.productId === productId && item.sessionId === sessionId
    );
  }

  async createCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = this.cartItemId++;
    const cartItem: CartItem = { ...insertCartItem, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const items = await this.getCartItems(sessionId);
    for (const item of items) {
      this.cartItems.delete(item.id);
    }
    return true;
  }
}

export const storage = new MemStorage();
