const  connection = require('./repository/connection');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

async function addData() {
    for(i = 0; i < 4000; ++i) {
        console.log(i);
        // luna = Math.floor(Math.random() * (13 - 1) + 1);
        // if(luna !== 2)
        //     zi = Math.floor(Math.random() * (31 - 1) + 1);
        // else
        //     zi = Math.floor(Math.random() * (29 - 1) + 1);
        // an = 2021;
        // cancel = Math.round(Math.random());

        // week = Math.floor(luna * 4 + zi / 4);

        // isCanceled = 0

        // if(Math.random() <= 0.3)
        //     isCanceled = 1;
        
        // date = an;
        // if(luna < 10)
        //     date = date + '-0' + luna;
        // else date = date + '-' + luna;

        // if(zi < 10)
        //     date = date + '-0' + zi;
        // else
        //     date = date + '-' + zi;

        // command = `Insert into Rezervari (will_cancel, is_canceled, year, month, day, week, date) Values ('${cancel}','${isCanceled}', '${an}', '${luna}', '${zi}', '${week}', '${date}')`;

        // await query(command);
        
        luna = Math.floor(Math.random() * (13 - 1) + 1);
        if(luna !== 2)
            zi = Math.floor(Math.random() * (23 - 1) + 1);
        else
            zi = Math.floor(Math.random() * (22 - 1) + 1);
        
        
        zi2 = Math.floor(Math.random() * (7 - 3) + 3) + zi;

        //console.log(zi, zi2);

        an = 2021;

        date = an;
        if(luna < 10)
            date = date + '-0' + luna;
        else date = date + '-' + luna;

        if(zi < 10)
            date = date + '-0' + zi;
        else
            date = date + '-' + zi;
        
        date2 = an;
        if(luna < 10)
            date2 = date2 + '-0' + luna;
        else date2 = date2 + '-' + luna;

        if(zi < 10)
            date2 = date2 + '-0' + zi2;
        else
            date2 = date2 + '-' + zi2;

        console.log(date, date2);
    }
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


addData();