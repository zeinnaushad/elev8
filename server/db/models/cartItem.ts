import mongoose from 'mongoose';
import type { CartItem, InsertCartItem } from '@shared/schema';

const cartItemSchema = new mongoose.Schema({
  sessionId: { 
    type: String, 
    required: true 
  },
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    default: 1 
  }
}, {
  timestamps: true
});

// Add virtual id field to match the interface
cartItemSchema.virtual('id').get(function() {
  return this._id;
});

// Set toJSON transform to include virtuals and remove _id and __v
cartItemSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const CartItemModel = mongoose.model('CartItem', cartItemSchema);

// Helper function to convert MongoDB document to our schema type
export function toCartItem(doc: any): CartItem {
  return {
    id: doc._id.toString(),
    sessionId: doc.sessionId,
    productId: doc.productId,
    quantity: doc.quantity
  };
}