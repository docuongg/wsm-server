const mongoose = require("mongoose");

const workingTimeSchema = new mongoose.Schema({
  checkIn: {
    type: Date,
  },
  checkOut: {
    type: Date,
  },
  date: {
    type: Date,
  },
  timeInCompany: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const WorkingTime = new mongoose.model("WorkingTime", workingTimeSchema);
module.exports = WorkingTime;
