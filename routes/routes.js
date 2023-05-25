
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


router.get('/api/users', usersController.getUsers);
router.get('/signUp', usersController.signUp)

module.exports = router;