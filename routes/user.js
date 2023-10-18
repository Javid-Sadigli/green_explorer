// Import express
const express = require('express');
const Router = express.Router();

// Import controllers
const UserController = require('../controllers/user');
const FileUploadController = require('../controllers/fileUpload');

// Route get requests
Router.get('/', UserController.GET_Home);
Router.get('/about', UserController.GET_About_Us);
Router.get('/sponsorships', UserController.GET_Sponsorships);
Router.get('/researchs', UserController.GET_Researchs);
Router.get('/add-research', UserController.GET_Add_Research);

// Route post requests
Router.post('/add-research', FileUploadController.upload.single('file'),UserController.POST_Add_Research);

// Route requests with additional parameters
Router.get('/researchs/:researchId', UserController.GET_Details);

module.exports = Router;