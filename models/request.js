const mongoose = require("mongoose");
const Enum = require('enum')

const user = require('./user')

const kind = new Enum({'takeLeave': 1, 'deviceRecall': 2})
const status = new Enum({'pending': 1, 'confirmed': 2, 'approved': 3, 'decline': 4, 'canceled': 5})

const requestSchema = new mongoose.Schema({
  kind: {
    type: String,
    enum: ['takeLeave', 'deviceRecall']
  },
  compensate: {
    type: Boolean,
    default: false
  },
  startAt: {
    type: Date
  },
  endAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'approved', 'decline', 'canceled']
  },
  content: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
})

const Request = new mongoose.model("Request", requestSchema);

module.exports = Request;
