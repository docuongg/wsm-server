const Profile = require('../models/profile')

exports.show = async (req, res, next) => {
  profile = await Profile.findOne({ user: req.params.id })
}
