
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//Acho que nao vai ser necessario
router.get('/api/users', usersController.getUsers);
router.post('/api/user/registerUser', usersController.registerUser)
router.post('/api/user/login', usersController.loginUser)
router.post('/api/company/registerCompany', usersController.registerCompany)
router.post('/api/company/login', usersController.loginCompany)
router.post('/api/user/getPortfolio', usersController.portfolioGet)
router.post('/api/user/savePortfolioSidebar', usersController.portfolioSaveSidebar)
router.post('/api/user/savePortfolioAboutMe', usersController.portfolioSaveAboutMe)
router.get('/api/enterprises', usersController.getEnterprises)
router.post('/api/user/addFriend', usersController.addFriends)
router.post('/api/user/listFriends', usersController.getFriends)
router.post('/api/user/getExperiences', usersController.getExperiences)
router.post('/api/user/getEducations', usersController.getEducations)
// add experience and educ routes
router.post('/api/user/addExperience', usersController.addExperience)
router.post('/api/user/addEducation', usersController.addEducation)
// delete experience and educ routes
router.post('/api/user/deleteExperience', usersController.deleteExperience)
router.post('/api/user/deleteEducation', usersController.deleteEducation)
module.exports = router;
