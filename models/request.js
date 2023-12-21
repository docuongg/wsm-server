const mongoose = require("mongoose");
const Enum = require('enum')

const user = require('./user')

const kind = new Enum({'take_leave': 1, 'device_recall': 2})
const status = new Enum({'pending': 1, 'confirmed': 2, 'approved': 3, 'decline': 4, 'canceled': 5})

const requestSchema = new mongoose.Schema({
  kind,
  start_at: {
    type: Date
  },
  end_at: {
    type: Date
  },
  status,
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
