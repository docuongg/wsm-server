const Request = require('../models/request');
const User = require('../models/user');

exports.index = async (req, res, next) => {
  const userId = req.user._id
  const user = await User.findById(userId)

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "User don't existed"
    })
  }

  const requests = await Request.find({ user: userId });

  return res.status(200).json({
    status: "success",
    requests
  })

}

exports.create = async (req, res, next) => {
  const userId = req.user._id

  const { kind, compensate, startAt, endAt, content } = req.body
  const request = await Request.create({
    kind, startAt, endAt, content, compensate,
    status: 'pending',
    user: userId
  })

  if (request) {
    return res.status(200).json({
      status: "success",
      request
    })
  }
  console.log(req.body)
}
