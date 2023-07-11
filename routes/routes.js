
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
router.post('/api/user/addExperience', usersController.addExperience)
router.post('/api/user/addEducation', usersController.addEducation)
router.post('/api/user/deleteExperience', usersController.deleteExperience)
router.post('/api/user/deleteEducation', usersController.deleteEducation)
router.post('/api/user/acceptFriend', usersController.acceptFriend)
router.post('/api/user/rejectFriend', usersController.rejectFriend)
router.get('/api/user/getUser/:userId', usersController.getUser)
router.post('/api/user/getUserByNick', usersController.getUserByNick)
router.get('/api/enterprises/NotConfirmed', usersController.getEnterprisesNotConfirmed)
router.get('/api/enterprises/Confirmed', usersController.getEnterprisesConfirmed)
router.post('/api/enterprises/accept', usersController.acceptEnterprise)
router.post('/api/enterprises/reject', usersController.rejectEnterprise)
router.get('/api/visibleUsers', usersController.getVisibleUsers);
router.post('/api/user/removeFriend', usersController.removeFriends)



module.exports = router;
