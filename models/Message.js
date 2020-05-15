const mongoose = require("../database/index")

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  apelido: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message