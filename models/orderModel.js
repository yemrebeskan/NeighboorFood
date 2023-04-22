const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      name: {
        type: String,
        required: [true, 'An item must have a name.'],
      },
      price: {
        type: Number,
        required: [true, 'An item must have a price.'],
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
