const express = require('express');
const router = express.Router();

const {getRegressions, getRezervariStatus, validateToken} = require('../data/data');

router.get('/getRegressions', validateToken, getRegressions);
router.post('/getRezervariStatus', validateToken, getRezervariStatus);
router.post('/validateToken', validateToken);

module.exports = {dataRoutes: router}