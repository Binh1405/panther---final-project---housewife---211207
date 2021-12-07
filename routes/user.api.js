const express = require('express');
const router = express.Router();
const {getAll, createByEmail, updateById, deleteById} = require('../controllers/user.controllers')

/* GET users listing. */
router.get('/', getAll);

router.post('/', createByEmail);

router.put('/:id', updateById);

router.delete('/:id', deleteById);

module.exports = router;
 