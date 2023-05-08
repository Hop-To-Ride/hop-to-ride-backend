const express = require('express');
const router =  express.Router();
const auth = require('../middleware/auth');

const authenticationController = require('../controllers/authenticationController');

router.post('/login', authenticationController.login);