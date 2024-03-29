const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef',
  },
  foods: [
    {
      orderedFood: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  state: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },
  active: {
    type: Boolean,
    default: true,
  },
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
