import axios, { AxiosInstance } from 'axios';

class Service {
    private instance: AxiosInstance;
    private authInstance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:3000/'
        });

        this.authInstance = axios.create({
            baseURL: 'http://localhost:3000/',
            headers: {
                Authorization: `${localStorage.getItem('tokenAdmin')}`
            }
        });
    }

    async logInRequest(body: any) {
        return this.instance.post('/logIn', {email: body.email, pass: body.password});
    }

    async forgotPassword(body: any) {
        return this.instance.post('/forgotPassword', {email: body.email});
    }

    async validateToken(body: any) {
        return this.instance.post('/evaluateToken', {token: body.token});
    }

    async changePassword(body: any) {
        return this.instance.patch('/resetPassword', {newPassword: body.password, token: body.token});
    }

    async getRegressions() {
        return this.authInstance.get('/getRegressions');
    }

    async getRezervariStatus(body: any) {
        return this.authInstance.post('/getRezervariStatus', {date1: body.dateFrom, date2: body.dateTo});
    }
}

export default Service;