import { Schema, model } from 'mongoose';
import { STATUS } from '../constants/filter.js';

const orderItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Good',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    goods: {
      type: [orderItemSchema],
      required: true,
      validate: [
        (arr) => arr.length > 0,
        'Order must contain at least one item',
      ],
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^\+?\d{10,15}$/,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postNumber: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      enum: STATUS,
      default: 'pending',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Order = model('Order', orderSchema);
