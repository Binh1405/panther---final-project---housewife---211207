const express = require('express');
const router = express.Router();
const {getAll, createByEmail, updateById, deleteById, loginWithEmailPassword, logoutUser} = require('../controllers/user.controllers');
const authenticationMiddleware = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/isAdmin.middleware');

/* GET users listing. */
router.get('/', authenticationMiddleware, getAll);
router.post('/', createByEmail);
router.post('/login', loginWithEmailPassword)
// router.get('/logout', logoutUser)
router.put('/update-profile', authenticationMiddleware, updateById);
router.delete('/delete-user', authenticationMiddleware, deleteById);

module.exports = router;
 