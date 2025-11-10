import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Ім’я користувача є обов’язковим'],
    },
    surname: {
      type: String,
      trim: true,
      default: '',
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
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
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
