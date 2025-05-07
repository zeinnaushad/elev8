import mongoose from 'mongoose';
import type { Product, InsertProduct } from '@shared/schema';

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  isNew: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Add virtual id field to match the interface
productSchema.virtual('id').get(function(this: any) {
  return this._id;
});

// Set toJSON transform to include virtuals and remove _id and __v
productSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const ProductModel = mongoose.model('Product', productSchema);

// Helper function to convert MongoDB document to our schema type
export function toProduct(doc: any): Product {
  return {
    id: doc._id.toString(),
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    price: doc.price,
    imageUrl: doc.imageUrl,
    categoryId: doc.categoryId,
    isNew: doc.isNew,
    createdAt: doc.createdAt
  };
}