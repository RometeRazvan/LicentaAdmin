const  connection = require('./connection');
const util = require('util');
var dotenv = require('dotenv');

dotenv.config();

const query = util.promisify(connection.query).bind(connection);

const getRegressionData = async () => {
    const command = `Select * from Regression_Data where id = 1`;
    const data = await query(command);

    return data;
}

const getRezervariStatusByInterval = async (date1, date2) => {
    command1 = `Select Count(*) from Rezervari where is_canceled = '0' and date between '${date1}' and '${date2}'`;
    command2 = `Select Count(*) from Rezervari where  is_canceled = '0' and will_cancel = 1 and date between '${date1}' and '${date2}'`;
    command3 = `Select Count(*) from Rezervari where is_canceled = '1' and date between '${date1}' and '${date2}'`;
    
    const data1 = await query(command1);
    const data2 = await query(command2);
    const data3 = await query(command3);

    const data = {
        normale: data1[0]['Count(*)'],
        pAnuleaza: data2[0]['Count(*)'],
        anulate: data3[0]['Count(*)'],
    }

    return data;
}

const getRezervariWeeks = async (week, year, wN) => {
    var actual = [];
    var willCancel = [];
    var cancelled = [];

    console.log(week + wN);

    for(let i = week; i < week + wN; ++i) {
        const command1 = `Select Count(*) from Rezervari where is_canceled = 0 and week = '${i}' and year = '${year}'`;
        const command2 = `Select Count(*) from Rezervari where is_canceled = 0 and will_cancel = 1 and week = '${i}' and year = '${year}'`;
        const command3 = `Select Count(*) from Rezervari where is_canceled = 1 and week = '${i}' and year = '${year}'`;
        
        var data1 = await query(command1);
        const data2 = await query(command2);
        const data3 = await query(command3);
        
        var sum = 0;

        // console.log('!!!!!!!!!!!', data1);

        // for(let i = 0; i < data1.length; ++i) {
        //     if(data1[0]['adults'] === null) {
        //         data1[0]['adults'] = 0;
        //     }
        //     if(data1[0]['children'] === null) {
        //         data1[0]['children'] = 0;
        //     }
        //     if(data1[0]['babies'] === null) {
        //         data1[0]['babies'] = 0;
        //     }

        //     sum = sum + data1[0]['adults'] + data1[0]['children'] +  data1[0]['babies'];
        // }

        const data = {
            actual: data1[0]['Count(*)'],
            willCancel: data2[0]['Count(*)'],
            cancelled: data3[0]['Count(*)'],
        }

        console.log(data);

        actual.push(data.actual);
        willCancel.push(data.willCancel);
        cancelled.push(data.cancelled);
    }

    const data = {
        actual: actual,
        willCancel: willCancel,
        cancelled: cancelled,
    }

    return data;
}

module.exports = {
    getRegressionData: getRegressionData,
    getRezervariStatusByInterval: getRezervariStatusByInterval,
    getRezervariWeeks: getRezervariWeeks,
}