const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users,
        },
    })
})

exports.getUserById = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        const id = req.params.id
        return next(new AppError(`No user found with that ${id}`, 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    })
})

exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    if (!user) {
        const id = req.params.id
        return next(new AppError(`No user found with that ${id}`, 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    })
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
        const id = req.params.id
        return next(new AppError(`No user found with that ${id}`, 404))
    }
    res.status(204).json({
        status: 'success',
        data: null,
    })
})

exports.rateChef = catchAsync(async (req, res, next) => {
    const chefId = req.params.id
    const rating = req.body.rating

    // Check if chef exists
    const chef = await User.findById(chefId)
    if (!chef) {
        return next(new AppError(`No chef found with id ${chefId}`, 404))
    }

    // Check if user is not the chef
    const userId = req.user.id
    if (chef.id === userId) {
        return next(new AppError('You cannot rate yourself!', 400))
    }

    // Update chef's rating and ratingCount
    const newRating =
        (chef.rating * chef.ratingCount + rating) / (chef.ratingCount + 1)
    chef.rating = newRating
    chef.ratingCount = chef.ratingCount + 1
    await chef.save()

    res.status(200).json({
        status: 'success',
        data: {
            chef,
        },
    })
})
