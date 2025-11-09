import { Schema, model } from 'mongoose';

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
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
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
      enum: ['man', 'women', 'unisex'],
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

export const Good = model('Good', goodSchema);
