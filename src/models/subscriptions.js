import { Schema, model } from 'mongoose';

const subscriptionSchema = new Schema(
  {
    email: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Subscription = model('Subscription', subscriptionSchema);
