const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const Food = require('./foodModel')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: [true, 'Email already exists'],
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: 8,
        select: false,
    },
    role: {
        type: String,
        enum: ['User', 'Chef', 'Admin'],
        default: 'User',
    },
    district: {
        type: String,
        trim: true,
        default: '',
    },
    menu: {
        type: Array,
        default: [],
    },
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
        type: Array,
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

const User = mongoose.model('User', userSchema)

module.exports = User
