
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//Acho que nao vai ser necessario
router.get('/api/users', usersController.getUsers);
router.post('/api/user/register', usersController.register)
router.post('/api/user/login', usersController.login)
//router.delete('/api/user/logout', usersController.logout)


module.exports = router;