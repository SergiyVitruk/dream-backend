import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Ім’я користувача є обов’язковим'],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, 'Номер телефону є обов’язковим'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Пароль є обов’язковим'],
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.pre('save', function (next) {
  if (!this.username) {
    this.username = this.phone;
  }
  next();
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
