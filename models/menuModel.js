const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    chefInfos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chef'
    },
    foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        }
    ]
})

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu

