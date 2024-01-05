const mongoose = require("mongoose");
const Enum = require('enum')

const user = require('./user')

const kind = new Enum({'takeLeave': 1, 'deviceRecall': 2})
const status = new Enum({'pending': 1, 'confirmed': 2, 'approved': 3, 'decline': 4, 'canceled': 5})

const requestSchema = new mongoose.Schema({
  kind: {
    type: Number,
    enum: Object.values(kind.enums),
  },
  startAt: {
    type: Date
  },
  endAt: {
    type: Date
  },
  status: {
    type: Number,
    enum: Object.values(status.enums),
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
})

const Request = new mongoose.model("Request", requestSchema);

module.exports = Request;
