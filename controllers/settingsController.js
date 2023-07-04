const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

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

exports.getImage = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }
  const imageBase64 = user.image
  res.send(imageBase64)
})

exports.changeImage = catchAsync(async (req, res, next) => {
  const imageBase64 = req.body.image

  const userId = req.params.id
  const user = await User.findByIdAndUpdate(
    userId,
    { image: imageBase64 },
    { new: true, runValidators: true }
  )
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

exports.removeImage = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      image:
        'iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8AAADg4ODa2trV1dX6+vr19fXx8fHo6Og6Ojrv7+/8/PzKysqZmZne3t4XFxdUVFSlpaW8vLyGhobDw8ONjY2fn5+qqqpwcHBdXV0MDAxBQUE4ODhaWlq2trZ+fn4uLi5FRUUlJSVnZ2ceHh50dHSJiYlMTEwUFBQxMTGonk3nAAAG7UlEQVR4nO2diXKiQBRFbQTEXVHAJVFBjfr/PzgaJ9GJaHp5G1OcD6C4RdPLW243GjU1NTU1NTWUdMNOdKETcr8JPKEfJ9tRu1CfHDf5fJ/2PO63AmOatBeqjN02q77KVjYqFffNYuJ3uV/SnmC6fS3vyqYfcb+pHWFa6Oj7ZO5zv605YaIt75Nlj/uNzQhSM30XDlX6jvHGXOCZfYf7xTVpza30Xci4312LlbW+MyP5n7E7cxF4JuZW8AvRm6NApfrcGl7Sc9Z3Zi54k5NBCFTqrcUt5BkWi2A5O6HbuD6UQKkSAQUqNRQoEegf/GInLg4whRV43ooLm1EH0AKV2nJr+odQ/yioj6il/x1BoFKCjozAs8w3AbewLyIkgWrOreyLA5ZCteKWdgVrjJ4ZitihhngClZpwq7uwxlSoBATF0aaZK+/c+hqNPa5CxR5jRP6EAj4i7l94ockrsIUuUO15FSKuhd/wrol24XszxpwCmwQC1RunQsMUmiWcMZsdicKUTyDJIFWqzadwTKOQcZjaJwrNmHIJRIk/lbHmUugRCVQHLoVO2V4ThlyZ4Q8qhWznYK2KJxC4Ut9tMoVM4e+ATCDXZIoaZPsXpiwNegDjBtNy4dMp3PAkE0FKS/TY8SgET/s+Z8GThSJUyJRn+/+/IeF/OORRSDiXFjwzDeF6mLMIpNzTMKW7CfelTJH9rnu1rC4Jj0LC8yFXxcKETCFXho0sTsMWMEUo1ytnySSw0aKKl864FDZ+6S0Eg680Cqx0/Rf4imqIck8Fm8BGY0iikLP0i2ZF5CwaIjlALRgFNhoU6wXXpvQKxWzK21zSwRfIXQqNX9fGXbGPviQyFmL8BfuQyN81i5zMP3HrO+Pa2vwa7r/wAmqJKfdEegVzTRRQqn8hRxMopX0NbcVgi148ANoCfIeQMXoBp7dLkg9IC+MozFyk/wOEg+JSTH/lFfjosDgfF+jZRtAs8wVszEbCbu0BSIkiBUJKZG/JewbQv7hgbld7RQwh8E2gr8mNZrnLpQlzYevgTwLXfJSU48QLnBppTmLnmHs8+334RJgpzVMsO0vblfiAVwKLpXEnxARDl8gwGF6MqzJAb0QGDaanlfAl4gnd1VJL36xC/98DXpq/Vjecr8T5lpkSrfbP2odGk54IAxp3uq1eOjncb+iKeZI1K//xSuhEg4EX/Y/Kamq4Cf3xx2io2hOg6EoQr/OiPevHIv7Y6Pw2tynyABF/yG5eFLttn3fG9ZOHTYuzh0Xr5xG62MZMIqPkWLaKH9yiLOWx8zl9vUK4en7M7dufErznMZAP0iB4p/+ynu1k6WPRet3gPycLE4e/H29zm5f5Pdqak1iAaF7NYXojR0svmkwQ6Mi0A6JvmX5+rKkfEdji/o9+rv0mZxYzrVEVjY2eihpRNS9EXMzi1/EJb6wXB7hngzVUfUvfq3ayKtt+dVvNsa2t5AeKQKfE0nA0S7Ke3xx43mDQ9ON0vXXyDcnh/8YAx9DaHujoqle6Q2MFdqRSmgtoMwfckFP5shmyBAvUYZWtOQPlkEVj/2gHyJQqWaA6AkgUO0SvLJwHqtBJ5obrdS0g5SO45E6JObJubRdcjMAC9+oYChza96h6tV2xDm4In0bvsIxgEnoIuTKyU0hj9AyDVagdv3cSkoG5QEInLwjMu/gIDYRgMI7AUVlewGE4nxL0aENjuLWp1jRzxSiKSmg2B4eRjStuby8WBh+xkp/Q6FohOpsyWLRDGijdhBRoW/VU4txbhvYGnMj+CR7tH7GiE43JvUl0lo+gGDS3V/QjmpygqhO/uMPsegGK28aAGZqFhis4nZoG3ETnY8ow9sfs0l1AAoKFazvZVUcw2BTSUVzeCIZdYL9Ch0TLiDDZpWPu2KZJK7Nk2Ne50dlZO+FyUWklQm5ul0FVIINoOct8EYhf+J0vSuoIj9m4V5tI39tYZNUeEJ0KhqmHFpxJhOoxESsRrsFE6ECF7KABMNaBB7YNypNXmAHd5xVJkwjfVRKK2t0sINbBn3SpbuHWYINkqigmrfiO1hgspAQF8+5cEZ0luNa0EXu4f4jdRRoyZ97eCYxbWeOoNI58EdvKeCIzxWRKL1I68g3Mm3edQev+fQL50kjvidkhTWu8s7i29siGqq3RhjtEUX9Wf/0U//DvYAYDQpCiHo2PiQCrqHCMlmc8plJMB+MThr4ik2Rp6oOvHXSOQrp0DD1YXrJMZbqWDxKYRNVEsmOr7yryuBY3Oh9ojkeWi+Ti0Jf89e7p9BJjs5fRpCfz33tK2ByvNRfK3T71BSzsdgzi8SwvnpjbLIrlNo0FX2ahT+j5vWmWJpP1/sx6nfSzac/3KvvdampqampqasTxB27tiqlDSRboAAAAAElFTkSuQmCC',
    },
    { new: true, runValidators: true }
  )
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

exports.updatePassword = catchAsync(async (req, res, next) => {
  const body = { ...req.body }
  const user = await User.findById(req.params.id).select('+password')
  if (!user) {
    const id = req.params.id
    return next(new AppError(`No user found with that ${id}`, 404))
  }

  const { password, newPassword } = body

  user.password = newPassword // Şifre yenilenirken kriptolamaya gerek yok.
  await user.save()

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

exports.updateAdress = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const adress = req.body
  const user = await User.findByIdAndUpdate(
    id,
    { district: adress },
    { new: true, runValidators: true }
  )
  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

exports.updatePhoneNumber = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const { phoneNumber } = req.body
  const user = await User.findByIdAndUpdate(
    id,
    { phoneNumber: phoneNumber },
    { new: true, runValidators: true }
  )
  if (!user) {
    return next(new AppError('No user found with that ID', 404))
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
