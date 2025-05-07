import { CategoryModel, ProductModel } from './models';
import { log } from '../vite';

// Initial categories data
const categoriesData = [
  {
    name: 'Women',
    slug: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000',
  },
  {
    name: 'Men',
    slug: 'men',
    imageUrl: 'https://images.unsplash.com/photo-1550246140-29f40b909e5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000',
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    imageUrl: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000',
  },
];

// Initial products data (will be populated with category IDs after categories are created)
let productsData = [
  {
    name: 'Wool Blend Coat',
    slug: 'wool-blend-coat',
    description: 'A luxurious wool-blend coat perfect for cold weather. Features a classic silhouette with a modern twist.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
    categoryId: '', // Will be populated with women category ID
    isNew: 1,
    createdAt: new Date()
  },
  {
    name: 'Cotton Shirt',
    slug: 'cotton-shirt',
    description: 'A comfortable 100% cotton shirt with a tailored fit. Perfect for casual or formal occasions.',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1602810320073-1230c46d89d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
    categoryId: '', // Will be populated with men category ID
    isNew: 1,
    createdAt: new Date()
  },
  {
    name: 'Leather Handbag',
    slug: 'leather-handbag',
    description: 'A stylish leather handbag with multiple compartments. Handcrafted with premium materials.',
    price: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df41c136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
    categoryId: '', // Will be populated with accessories category ID
    isNew: 1,
    createdAt: new Date()
  },
  {
    name: 'Summer Dress',
    slug: 'summer-dress',
    description: 'A lightweight summer dress made from breathable fabric. Features a flattering silhouette and vibrant pattern.',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
    categoryId: '', // Will be populated with women category ID
    isNew: 0,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
  },
  {
    name: 'Slim Fit Jeans',
    slug: 'slim-fit-jeans',
    description: 'Modern slim fit jeans made from premium denim. Features a comfortable stretch and durable construction.',
    price: 69.99,
    imageUrl: 'https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
    categoryId: '', // Will be populated with men category ID
    isNew: 0,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000) // 45 days ago
  },
  {
    name: 'Silver Watch',
    slug: 'silver-watch',
    description: 'An elegant silver watch with a minimalist design. Features a premium quartz movement and sapphire crystal.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200',
    categoryId: '', // Will be populated with accessories category ID
    isNew: 0,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) // 60 days ago
  }
];

export async function seedDatabase() {
  try {
    // Check if data already exists
    const categoryCount = await CategoryModel.countDocuments();
    const productCount = await ProductModel.countDocuments();
    
    if (categoryCount > 0 && productCount > 0) {
      log('Database already seeded - skipping', 'mongodb');
      return true;
    }
    
    log('Seeding database with initial data...', 'mongodb');
    
    // Clear existing data
    await CategoryModel.deleteMany({});
    await ProductModel.deleteMany({});
    
    // Create categories
    const categoryDocs = await CategoryModel.insertMany(categoriesData);
    log(`Created ${categoryDocs.length} categories`, 'mongodb');
    
    // Create a map of category slugs to ids
    const categoryMap = categoryDocs.reduce((map, category) => {
      map[category.slug] = category._id;
      return map;
    }, {} as Record<string, any>);
    
    // Assign category IDs to products
    productsData = productsData.map(product => {
      if (product.slug.includes('dress') || product.slug.includes('coat')) {
        product.categoryId = categoryMap['women'];
      } else if (product.slug.includes('shirt') || product.slug.includes('jeans')) {
        product.categoryId = categoryMap['men'];
      } else {
        product.categoryId = categoryMap['accessories'];
      }
      return product;
    });
    
    // Create products
    const productDocs = await ProductModel.insertMany(productsData);
    log(`Created ${productDocs.length} products`, 'mongodb');
    
    log('Database seeded successfully', 'mongodb');
    return true;
  } catch (error) {
    log(`Error seeding database: ${error}`, 'mongodb');
    console.error('Error seeding database:', error);
    return false;
  }
}