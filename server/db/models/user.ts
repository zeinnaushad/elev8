import mongoose from 'mongoose';
import type { User, InsertUser } from '@shared/schema';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  }
}, {
  timestamps: true
});

// Add virtual id field to match the interface
userSchema.virtual('id').get(function() {
  return this._id;
});

// Set toJSON transform to include virtuals and remove _id and __v
userSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.password; // Don't expose password in JSON responses
    return ret;
  }
});

export const UserModel = mongoose.model('User', userSchema);

// Helper function to convert MongoDB document to our schema type
export function toUser(doc: any): User {
  return {
    id: doc._id.toString(),
    username: doc.username,
    password: doc.password,
    email: doc.email
  };
}