const mongoose = require('mongoose');
const Enum = require('enum')

const division = new Enum({'d1': 1, 'd2': 2, 'd3': 3, 'sg': 4})
const gender = new Enum({'male': 1, 'female': 2})

const profileSchema = new mongoose.Schema({
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
