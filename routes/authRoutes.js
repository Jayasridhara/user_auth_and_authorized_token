const express = require('express');
const { registerUser, loginUser,  me } = require('../Controllers/authController');
const { isAuthenticated } = require('../middleware/auth');


const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/me', isAuthenticated, me);
module.exports = authRouter;

   
