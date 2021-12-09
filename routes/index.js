const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send("homepage");
});

const userRoutes = require("./user.api")
router.use("/users", userRoutes)

const productRoutes = require("./product.api")
router.use("/products", productRoutes)

module.exports = router; 
