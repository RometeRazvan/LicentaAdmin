const  connection = require('./connection');
const util = require('util');

const query = util.promisify(connection.query).bind(connection);

const getUser = async (email) => {
    const command = `Select * from USERS where email = '${email}'`;
    const data = await query(command);

    return data;
}

const updateLogInToken = async (email, token) => {
    const command = `Update USERS set logintoken = '${token}' where email = '${email}'`;
    await query(command);
}

const updateResetPasswordToken = async (email, token) => {
    const command = `Update USERS set resetpasswordtoken = '${token}' where email = '${email}'`;
    await query(command);
}

const getByResetToken = async (token) => {
    const command = `Select * from USERS where resetpasswordtoken = '${token}'`;
    const data = await query(command);

    return data;
}

const resetPassword = async (newPassword, token) => {
    const command = `Update USERS set pass = '${newPassword}' where resetpasswordtoken = '${token}'`;
    await query(command);
}

module.exports = {
    getUser: getUser,
    updateLogInToken: updateLogInToken,
    updateResetPasswordToken: updateResetPasswordToken,
    getByResetToken: getByResetToken,
    resetPassword: resetPassword,
}