const express = require("express")

const router = express.Router()

router.get('/', (req, res) => {
  res.render("index")
});

router.post('/', (req, res) => {
  if (req.body.apelido) {
    res.render("chat", { apelido: req.body.apelido })
  } else {
    res.render("index")
  }
});

module.exports = app => app.use("/", router)