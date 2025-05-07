import mongoose from 'mongoose';
import type { Category, InsertCategory } from '@shared/schema';

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  imageUrl: { 
    type: String, 
    required: true 
  }
}, { 
  timestamps: true 
});

// Add virtual id field to match the interface
categorySchema.virtual('id').get(function() {
  return this._id;
});

// Set toJSON transform to include virtuals and remove _id and __v
categorySchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const CategoryModel = mongoose.model('Category', categorySchema);

// Helper function to convert MongoDB document to our schema type
export function toCategory(doc: any): Category {
  return {
    id: doc._id.toString(),
    name: doc.name,
    slug: doc.slug,
    imageUrl: doc.imageUrl
  };
}