
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//Acho que nao vai ser necessario
router.get('/api/users', usersController.getUsers);
router.post('/api/user/registerUser', usersController.registerUser)
router.post('/api/user/login', usersController.login)
router.post('/api/company/registerCompany', usersController.registerCompany)
//router.delete('/api/user/logout', usersController.logout)


module.exports = router;