import { Schema, model } from 'mongoose';
import validator from 'validator';
import { hash, compare } from 'bcryptjs';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email.'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    trim: true,
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    trim: true,
    validate: {
      // this only works on CREATE and SAVE!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  //   Hash the password with cost of 12
  this.password = await hash(this.password, 12);

  //   Delete passwordConfirm field
  this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await compare(candidatePassword, userPassword);
};

const User = model('User', userSchema);

export default User;
