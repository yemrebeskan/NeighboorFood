const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllChefs = catchAsync(async (req, res, next) => {
    const chef = await User.find({ role: 'Chef' })

    res.status(200).json({
        status: 'success',
        results: chef.length,
        data: {
            chef,
        },
    })
})

exports.getChefById = catchAsync(async (req, res, next) => {
    const chefs = await User.find({ _id: req.params.id, role: 'chef' })
    if (!chefs || chefs.length === 0) {
        const id = req.params.id
        return next(new AppError(`No chef found with that ${id}`, 404))
    }
    res.status(200).json({
        status: 'success',
        results: chefs.length,
        data: {
            chefs,
        },
    })
})

exports.getChefByDistrict = catchAsync(async (req, res, next) => {
    const district = req.params.district
    const chefs = await User.find({
        district: new RegExp(district, 'i'),
        role: 'Chef',
    })

    if (!chefs || chefs.length === 0) {
        return next(new AppError(`No chef found in ${district}`, 404))
    }

    res.status(200).json({
        status: 'success',
        results: chefs.length,
        data: {
            chefs,
        },
    })
})

exports.getChefMenu = catchAsync(async (req, res, next) => {
    const chef = await User.findById(req.params.id).populate('menu')
    if (!chef) {
        const id = req.params.id
        return next(new AppError(`No chef found with that ${id}`, 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            menu: chef.menu,
        },
    })
})

exports.getChefAndMenuByDistrict = catchAsync(async (req, res, next) => {
    const district = req.params.district

    // Find chefs that match the district and role
    const chefs = await User.find({
        district: new RegExp(district, 'i'),
        role: 'Chef',
    })

    if (!chefs || chefs.length === 0) {
        return next(new AppError(`No chef found in ${district}`, 404))
    }

    // Get the chef's name and menu for each chef
    const chefAndMenu = await Promise.all(
        chefs.map(async (chef) => {
            // Get the chef's name
            const chefName = chef.name

            // Get the chef's menu for the current date
            const menu = await Food.findOne({
                chef: chef._id,
                date: new Date().toLocaleDateString(),
            })

            return {
                chef: chefName,
                menu: menu ? menu.menuItems : 'No menu available',
            }
        })
    )

    res.status(200).json({
        status: 'success',
        results: chefAndMenu.length,
        data: {
            chefAndMenu,
        },
    })
})

exports.updateChef = catchAsync(async (req, res, next) => {
    const { name, menu } = req.body
    const chef = await User.findById(req.params.id)

    if (!chef) {
        return next(new AppError('No chef found with that id', 404))
    }

    if (chef.role !== 'chef') {
        return next(
            new AppError('You are not authorized to perform this action', 403)
        )
    }

    chef.name = name
    chef.menu = menu
    await chef.save()

    res.status(200).json({
        status: 'success',
        data: {
            chef,
        },
    })
})

exports.updateChefMenu = catchAsync(async (req, res, next) => {
    console.log(req.body)
    const { menu } = req.body
    console.log(menu)
    
    
    const chef = await User.findById(req.params.id)
    console.log(chef.role)
    if (!chef) {
        return next(new AppError('No chef found with that id', 404))
    }

    if (chef.role !== 'Chef') {
        console.log(chef.role)
        return next(
            new AppError('You are not authorized to perform this action', 403)
        )
    }

    // Güncellenecek menü bilgisi
    chef.menu = menu

    // Chef modelini kaydet
    await chef.save()

    res.status(200).json({
        status: 'success',
        data: {
            chef,
        },
    })
})
