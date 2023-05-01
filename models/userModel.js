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

const User = mongoose.model('User', userSchema)

module.exports = User
