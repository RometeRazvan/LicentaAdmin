const { request, response } = require('express');
const repoData = require('../repository/dataRepo');
var currentWeekNumber = require('current-week-number');
var dotenv = require('dotenv');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const repoUser = require('../repository/userRepo');

dotenv.config();

const getRegressions = async (request, response) => {
    const year = new Date().getFullYear();

    const wk_numb = Number(process.env.WEEK_ADD);
    const wPredict = Number(process.env.WEEKS_PREDICT);

    const week = currentWeekNumber() + wk_numb;
    
    var data = await repoData.getRegressionData();

    data = data[0];

    const info = {"constanta": data.constanta, "panta": data.panta, "week": week, "err": data.err, "nr": wPredict};

    const address = process.env.PYTHON_API + '/getCustomerPredictions';

    try {
        const ress = await axios.post(address, info);

        const cWeek = currentWeekNumber();

        const data = await repoData.getRezervariWeeks(cWeek, year, wPredict);

        var weeks = []

        var rez = []

        for(let i = 0; i < wPredict; ++i) {
            weeks.push(cWeek + i);

            var parte = []

            parte.push(weeks[i]);
            parte.push(ress.data[0][i]);
            parte.push(ress.data[1][i]);
            parte.push(data.actual[i]);
            parte.push(data.willCancel[i]);
            parte.push(data.cancelled[i]);

            rez.push(parte);
        }

        console.log(rez);
        
        response.json({
            data: rez,
        });

        response.status(200).send();
    }
    catch(err) {
        console.log(err);
    }
}

const getRezervariStatus = async (request, response) => {
    const {date1, date2} = request.body;

    try {

        const data = await repoData.getRezervariStatusByInterval(date1, date2);

        response.status(200).send(data);
    }
    catch(err) {
        console.log(err);
        response.status(500).send();
    }
}

const validateToken = async (request, response, next) => {
    const token = request.headers['authorization'];

    if(typeof token !== 'undefined') {
        try {
    
            const decoded = jwt.decode(token, process.env.SECRET_KEY, function(error, decoded) {
                if(error) {
                    return response.status(401).json({
                        error: 'Token incorect sau expirat'
                    });
                }
            });

            if(decoded === null) {
                return response.status(401).send();
            }

            // console.log(decoded);

            const data = await repoUser.getUser(decoded.email);

            if(data[0].logintoken === token) {
                console.log('ok');
                next();
            }
            else {
                response.status(401).send();
            }
    
        }
        catch(err) {
            console.log(err);
            response.status(500).send();
        }
    }
    else {
        response.status(401).send();
    }
}

module.exports = {
    getRegressions: getRegressions,
    getRezervariStatus: getRezervariStatus,
    validateToken: validateToken,
}