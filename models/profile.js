const mongoose = require('mongoose');
const Enum = require('enum')

const profileSchema = new mongoose.Schema({
  givenName: {
    type: String,
    required: [true, "First Name is required"],
  },
  familyName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  avatar: {
    type: String,
  },
  phone: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  division: {
    type: String,
    enum: ['d1', 'd2', 'd3', 'sg']
  },
  onBoardDay: {
    type: Date
  },
  officialWorkingDay: {
    type: Date
  },
  address: {
    type: String
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  }
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
