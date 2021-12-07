const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send("haha");
});

const userRoutes = require("./user.api")
router.use("/users", userRoutes)

module.exports = router; 
