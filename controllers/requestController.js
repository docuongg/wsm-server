const Request = require('../models/request')

exports.create = async (req, res, next) => {
  const userId = req.user._id
  const { kind, startAt, endAt, content } = req.body
  const request = await Request.create({
    kind, startAt, endAt, content,
    status: 'pending',
    user: userId
  })

  if (request) {
    return res.status(200).json({
      status: "success",
      request
    })
  }
}
