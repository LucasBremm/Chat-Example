const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/chat", { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose