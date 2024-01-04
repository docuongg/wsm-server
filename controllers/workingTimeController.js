const User = require('../models/user');
const WorkingTime = require('../models/workingTime')

exports.index = async (req, res, next) => {
  const userId = req.user._id
  const user = await User.findById(userId)

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "User don't existed"
    })
  }

  const workingTimes = await WorkingTime.find({ user: userId });

  return res.status(200).json({
    status: "success",
    workingTimes
  })
}

exports.create = async (req, res, next) => {
  const { checkInTime, checkOutTime } = req.body
  const userId = req.user._id

  const workingTimeToday = await WorkingTime.findOne({date: Date.now()})

  if (!workingTimeToday) {
    const workingTime = await WorkingTime.create({
      checkIn: checkInTime,
      checkOut: checkOutTime,
      date: Date.now(),
      user: userId
    })

    if (workingTime) {
      return res.status(200).json({
        status: "success",
        workingTime
      })
    }
  }

  return res.status(400).json({
    status: "error"
  })
}
