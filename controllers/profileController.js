const Profile = require('../models/profile')
const User = require("../models/user");
const filterObj = require("../utils/filterObj")

exports.show = async (req, res, next) => {
  profile = await Profile.findOne({ user: req.params.id })

  if (!profile) {
    return res.status(400).json({
      status: "error",
      message: "Profile don't existed.",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Successfully!",
    profile
  });
}

exports.update = async (req, res, next) => {
  const profileParam = filterObj(
    req.body,
    "givenName",
    "familyName",
    "division",
    "gender",
    "phone"
  )

  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: req.params.id },
      { $set: profileParam },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found",
      });
    }

    console.log(updatedProfile);

    return res.status(200).json({
      status: "success",
      message: "Successfully updated",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
