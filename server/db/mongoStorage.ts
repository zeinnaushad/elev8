import { Types } from 'mongoose';
import type { IStorage } from '../storage';
import type { Category, InsertCategory, Product, InsertProduct, CartItem, InsertCartItem, User, InsertUser } from '@shared/schema';
import { CategoryModel, ProductModel, CartItemModel, UserModel, toCategory, toProduct, toCartItem, toUser } from './models';
import { log } from '../vite';

export class MongoStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const user = await UserModel.findById(id);
      return user ? toUser(user) : undefined;
    } catch (error) {
      log(`Error in getUser: ${error}`, 'mongodb');
      return undefined;
    }
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ username });
      return user ? toUser(user) : undefined;
    } catch (error) {
      log(`Error in getUserByUsername: ${error}`, 'mongodb');
      return undefined;
    }
  }
  
  async createUser(user: InsertUser): Promise<User> {
    try {
      const newUser = new UserModel(user);
      const savedUser = await newUser.save();
      return toUser(savedUser);
    } catch (error) {
      log(`Error in createUser: ${error}`, 'mongodb');
      throw error;
    }
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    try {
      const categories = await CategoryModel.find();
      return categories.map(category => toCategory(category));
    } catch (error) {
      log(`Error in getCategories: ${error}`, 'mongodb');
      return [];
    }
  }
  
  async getCategory(id: number): Promise<Category | undefined> {
    try {
      const category = await CategoryModel.findById(id);
      return category ? toCategory(category) : undefined;
    } catch (error) {
      log(`Error in getCategory: ${error}`, 'mongodb');
      return undefined;
    }
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    try {
      const category = await CategoryModel.findOne({ slug });
      return category ? toCategory(category) : undefined;
    } catch (error) {
      log(`Error in getCategoryBySlug: ${error}`, 'mongodb');
      return undefined;
    }
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    try {
      const newCategory = new CategoryModel(category);
      const savedCategory = await newCategory.save();
      return toCategory(savedCategory);
    } catch (error) {
      log(`Error in createCategory: ${error}`, 'mongodb');
      throw error;
    }
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    try {
      const products = await ProductModel.find();
      return products.map(product => toProduct(product));
    } catch (error) {
      log(`Error in getProducts: ${error}`, 'mongodb');
      return [];
    }
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    try {
      const product = await ProductModel.findById(id);
      return product ? toProduct(product) : undefined;
    } catch (error) {
      log(`Error in getProduct: ${error}`, 'mongodb');
      return undefined;
    }
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    try {
      const product = await ProductModel.findOne({ slug });
      return product ? toProduct(product) : undefined;
    } catch (error) {
      log(`Error in getProductBySlug: ${error}`, 'mongodb');
      return undefined;
    }
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const products = await ProductModel.find({ categoryId });
      return products.map(product => toProduct(product));
    } catch (error) {
      log(`Error in getProductsByCategory: ${error}`, 'mongodb');
      return [];
    }
  }
  
  async getNewArrivals(): Promise<Product[]> {
    try {
      const products = await ProductModel.find({ isNew: 1 }).sort({ createdAt: -1 }).limit(8);
      return products.map(product => toProduct(product));
    } catch (error) {
      log(`Error in getNewArrivals: ${error}`, 'mongodb');
      return [];
    }
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    try {
      const newProduct = new ProductModel(product);
      const savedProduct = await newProduct.save();
      return toProduct(savedProduct);
    } catch (error) {
      log(`Error in createProduct: ${error}`, 'mongodb');
      throw error;
    }
  }
  
  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    try {
      const cartItems = await CartItemModel.find({ sessionId }).populate('productId');
      return cartItems.map(item => toCartItem(item));
    } catch (error) {
      log(`Error in getCartItems: ${error}`, 'mongodb');
      return [];
    }
  }
  
  async getCartItem(id: number): Promise<CartItem | undefined> {
    try {
      const cartItem = await CartItemModel.findById(id);
      return cartItem ? toCartItem(cartItem) : undefined;
    } catch (error) {
      log(`Error in getCartItem: ${error}`, 'mongodb');
      return undefined;
    }
  }
  
  async getCartItemByProductAndSession(productId: number, sessionId: string): Promise<CartItem | undefined> {
    try {
      const cartItem = await CartItemModel.findOne({ productId, sessionId });
      return cartItem ? toCartItem(cartItem) : undefined;
    } catch (error) {
      log(`Error in getCartItemByProductAndSession: ${error}`, 'mongodb');
      return undefined;
    }
  }
  
  async createCartItem(cartItem: InsertCartItem): Promise<CartItem> {
    try {
      // Check if item already exists
      const existingItem = await CartItemModel.findOne({ 
        productId: cartItem.productId, 
        sessionId: cartItem.sessionId 
      });
      
      if (existingItem) {
        // Update quantity if already exists
        existingItem.quantity += cartItem.quantity || 1;
        const updatedItem = await existingItem.save();
        return toCartItem(updatedItem);
      } else {
        // Create new cart item if doesn't exist
        const newCartItem = new CartItemModel(cartItem);
        const savedCartItem = await newCartItem.save();
        return toCartItem(savedCartItem);
      }
    } catch (error) {
      log(`Error in createCartItem: ${error}`, 'mongodb');
      throw error;
    }
  }
  
  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    try {
      const updatedCartItem = await CartItemModel.findByIdAndUpdate(
        id, 
        { quantity }, 
        { new: true }
      );
      return updatedCartItem ? toCartItem(updatedCartItem) : undefined;
    } catch (error) {
      log(`Error in updateCartItemQuantity: ${error}`, 'mongodb');
      return undefined;
    }
  }
  
  async deleteCartItem(id: number): Promise<boolean> {
    try {
      const result = await CartItemModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      log(`Error in deleteCartItem: ${error}`, 'mongodb');
      return false;
    }
  }
  
  async clearCart(sessionId: string): Promise<boolean> {
    try {
      const result = await CartItemModel.deleteMany({ sessionId });
      return result.deletedCount > 0;
    } catch (error) {
      log(`Error in clearCart: ${error}`, 'mongodb');
      return false;
    }
  }
}