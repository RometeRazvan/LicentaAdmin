const express = require('express');
const {login, forgotPassword, changePassword, evaluateToken} = require('../login/login');
const router = express.Router();

router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword', changePassword);
router.post('/evaluateToken', evaluateToken);

module.exports = {loginRoutes: router};