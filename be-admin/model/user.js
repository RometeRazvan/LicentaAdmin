class User {
    constructor(email, password, logintoken, resetpasswordtoken) {
        this.email = email;
        this.password = password;
        this.logintoken = logintoken;
        this.resetpasswordtoken = resetpasswordtoken;
    }
}

module.exports = User;