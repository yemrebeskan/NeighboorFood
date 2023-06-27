const express = require('express')
const morgan = require('morgan')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const bodyparser = require('body-parser')
const app = express()
const userRouter = require('./routes/userRoutes')
const chefRouter = require('./routes/chefRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const orderRouter = require('./routes/orderRoutes')
const settingsRouter = require('./routes/settingsRoutes')
const favouriteRouter = require('./routes/favouriteRoutes')
const adminRouter = require('./routes/adminRoutes')
const cors = require('cors')

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(bodyparser.json())
app.use(cors())
app.use('/api/v1/users', userRouter)
app.use('/api/v1/chefs', chefRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/settings', settingsRouter)
app.use('/api/v1/favourites', favouriteRouter)
app.use('/api/v1/admin', adminRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app
