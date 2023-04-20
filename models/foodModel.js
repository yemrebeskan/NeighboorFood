//belki kullanılır diye duruyo
const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A food must have a name'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'A food must have a price'],
    },
    image: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        required: [true, 'A food must have a category'],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A food must have a creator'],
    },
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food
