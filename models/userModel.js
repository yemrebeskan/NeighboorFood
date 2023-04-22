const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const Review = require('./reviewModel')
const Order = require('./orderModel')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    minlength: 8,
    select: false,
  },
  district: {
    type: String,
    trim: true,
    default: '',
  },
  favourites: {
    type: Array,
    default: [],
  },
  orderHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  role: {
    type: String,
    enum: ['User', 'Chef', 'Admin'],
    default: 'User',
  },
  menu: [
    {
      name: {
        type: String,
        trim: true,
        default: 'undefined',
      },
      price: {
        type: Number,
        default: 0,
      },
    },
  ],

  rating: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  about: {
    type: String,
    default: '',
  },
  reviews: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    default: [],
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hashSync(this.password, 12)
  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  if (this.role === 'User') {
    delete obj.menu
    delete obj.rating
    delete obj.ratingCount
    delete obj.about
    delete obj.reviews
  }
  return obj
}

const User = mongoose.model('User', userSchema)

module.exports = User
