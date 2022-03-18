const express = require('express');
const repoUser = require('../repository/userRepo');
const User = require('../model/user');
const mailgun = require('mailgun-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var dotenv = require('dotenv');
const { request } = require('express');

dotenv.config();

const login = async (request, response) => {
    const {email, pass} = request.body;

    try {
        const data = await repoUser.getUser(email);
        const user = new User(data[0].email, data[0].pass, data[0].logintoken, data[0].resetpasswordtoken);

        const valid = await bcrypt.compare(pass, user.password);

        if(!valid) {
            throw new Error();
        }

        const token = await jwt.sign({email: email, password: pass}, process.env.SECRET_KEY);

        await repoUser.updateLogInToken(email, token);

        response.json({
            token: token,
            nume: data[0].nume,
            prenume: data[0].prenume,
        });

        response.status(200).send();

    }
    catch(err) {
        response.status(403).send('Nume sau parola incorecte');
    }
}

const forgotPassword = async (request, response) => {
    console.log('Forgot pass ...');
    try {
        const {email} = request.body;

        const token = await jwt.sign({email: email},  process.env.SECRET_KEY, {expiresIn: '20m'});

        await repoUser.updateResetPasswordToken(email, token);

        //const senderEmail = process.env.SENDER_EMAIL;
        const domain = process.env.DOMAIN;
        const apiKey = process.env.API_KEY;

        const mg = mailgun({apiKey: apiKey, domain: domain});
        const mailInfo = {
	        from: 'noreply@hello.com',
	        to: email,
	        subject: 'Forgot password',
	        text: `Va rog apasati link-ul urmator pentru a va schimba parola:
                    http://localhost:3000/resetPassword/${token}`
        };

        console.log(token);

        mg.messages().send(mailInfo);

        response.status(200).send();
    }
    catch (err) {
        response.status(500).send('Erorare pe server');
    }
}

const evaluateToken = async (request, response) => {
    const {token} = request.body;

    jwt.verify(token, process.env.SECRET_KEY, function(error, decoded) {
        if(error) {
            return response.status(401).json({
                error: 'Token incorect sau expirat'
            });
        }
    });

    return response.status(200).send();
}

const changePassword = async (request, response) => {
    const {newPassword, token} = request.body;
    try {

        jwt.verify(token, process.env.SECRET_KEY, function(error, decoded) {
            if(error) {
                return response.status(401).json({
                    error: 'Token incorect sau expirat'
                });
            }
        });

        const data = await repoUser.getByResetToken(token);
        
        if(data[0].resetpasswordtoken !== token) {
            throw new Error();
        }

        const crptdPass = await bcrypt.hash(newPassword, 1);

        await repoUser.resetPassword(crptdPass, token);
    }
    catch(err) {
        response.status(401).send('Token invalid');
    }

    response.status(200).send();
}

module.exports = {
    login: login,
    forgotPassword: forgotPassword,
    changePassword: changePassword,
    evaluateToken: evaluateToken,
};