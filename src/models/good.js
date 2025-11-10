import { Schema, model } from 'mongoose';
import { GENDERS, SIZES } from '../constants/filter.js';

const goodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      value: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
        trim: true,
      },
    },
    size: {
      type: [String],
      required: true,
      enum: SIZES,
    },
    description: {
      type: String,
      required: true,
    },
    feedbacks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Feedback',
        default: [],
      },
    ],
    prevDescription: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      enum: GENDERS,
      required: true,
    },
    characteristics: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

goodSchema.index({ category: 1 });
goodSchema.index({ gender: 1 });
goodSchema.index({ 'price.value': 1 });
goodSchema.index({ size: 1 });
goodSchema.index({ category: 1, gender: 1, 'price.value': 1 });

export const Good = model('Good', goodSchema);
