const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  surname: {
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
    minlength: 6,
    select: false,
  },
  image: {
    type: String,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png',
  },
  district: {
    type: String,
    trim: true,
    default: '',
  },
  favouriteChefs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chef',
    },
  ],

  cart: {
    foods: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },

  orderHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
  isChef: {
    type: Boolean,
    default: false,
  },
  isApplied: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
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

userSchema.methods.addToCart = function (food) {
  const cartFoodIndex = this.cart.foods.findIndex((cp) => {
    return cp.foodId.toString() === food._id.toString()
  })
  let newQuantity = 1
  const updatedCartFoods = [...this.cart.foods]

  if (cartFoodIndex >= 0) {
    newQuantity = this.cart.foods[cartFoodIndex].quantity + 1
    updatedCartFoods[cartFoodIndex].quantity = newQuantity
  } else {
    updatedCartFoods.push({
      foodId: food._id,
      quantity: newQuantity,
    })
  }
  const updatedTotalPrice = this.cart.totalPrice + food.price
  const updatedCart = {
    foods: updatedCartFoods,
    totalPrice: updatedTotalPrice,
  }
  this.cart = updatedCart
  return this.save()
}

userSchema.methods.removeFromCart = function (food) {
  const cartFoodIndex = this.cart.foods.findIndex((cp) => {
    return cp.foodId.toString() === food._id.toString()
  })
  let newQuantity = 0
  let updatedCartFoods = [...this.cart.foods]

  if (cartFoodIndex >= 0) {
    newQuantity = this.cart.foods[cartFoodIndex].quantity - 1
    updatedCartFoods[cartFoodIndex].quantity = newQuantity

    if (newQuantity === 0) {
      updatedCartFoods = this.cart.foods.filter((foodInCart) => {
        return foodInCart.foodId.toString() !== food._id.toString()
      })
    }
    const updatedTotalPrice = this.cart.totalPrice - food.price
    this.cart.foods = updatedCartFoods
    this.cart.totalPrice = updatedTotalPrice
    return this.save()
  }
  return new Error('error')
}

userSchema.methods.clearCart = function () {
  this.cart = { foods: [] }
  return this.save()
}

const User = mongoose.model('User', userSchema)

module.exports = User
