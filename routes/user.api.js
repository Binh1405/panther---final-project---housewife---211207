const express = require('express');
const router = express.Router();
const {getAll, createByEmail, updateById, deleteById, loginWithEmailPassword, importantController} = require('../controllers/user.controllers');
const authenticationMiddleware = require('../middlewares/auth.middleware');

/* GET users listing. */
router.get('/', getAll);


router.post('/', createByEmail);
router.post('/login', loginWithEmailPassword)
router.post("/haha", authenticationMiddleware, importantController)

router.put('/:id', authenticationMiddleware, updateById);

router.delete('/:id', authenticationMiddleware, deleteById);

module.exports = router;
 