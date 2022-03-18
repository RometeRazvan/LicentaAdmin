import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Admin from '../components/Admin';
import Service from '../remote/Service';

export interface AdminPageProps extends RouteComponentProps {}
 
export interface AdminPageState {
    isLoading: boolean;
    dateTable: any;
    dateSearch: any;
    dateFrom: string;
    dateTo: string;
    nume: any;
    actual: number;
    willCancel: number;
    cancelled: number;
    isLoadingDate: boolean;
}
 
class AdminPage extends React.Component<AdminPageProps, AdminPageState> {
    private service: Service;

    constructor(props: AdminPageProps) {
        super(props);
        
        this.service = new Service();

        this.state = {
            isLoading: true,
            dateTable: null,
            dateSearch: null,
            nume: localStorage.getItem('nume'),
            dateFrom: '2021-01-01',
            dateTo: '2021-12-31',
            actual: 0,
            willCancel: 0,
            cancelled: 0,
            isLoadingDate: true,
        }
    }

    componentDidMount = async () => {
        try {
            
            this.getStatus();

            if(localStorage.getItem('tokenAdmin') === null) {
                throw new Error();
            }
            const regressions = await this.service.getRegressions();

            this.setState({
                dateTable: regressions.data.data,
                isLoading: false,
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    getStatus = async () => {
        this.setState({
            isLoadingDate: true,
        })

        const result = await this.service.getRezervariStatus(this.state);

        this.setState({
            actual: result.data.normale,
            willCancel: result.data.pAnuleaza,
            cancelled: result.data.anulate,
            isLoadingDate: false,
        });
    }

    logOut = async () => {
        localStorage.removeItem('tokenAdmin');
        localStorage.removeItem('nume');

        this.props.history.push('/');
    }

    handleChange = (data: any) => {
		this.setState({
			...data,
			isError: false,
		});
	};

    render() { 
        return (
            <div>
                <Admin {...this.state} logOut = {this.logOut} handleChange = {this.handleChange} getStatus = {this.getStatus} />
            </div>
        );
    }
}
 
export default withRouter(AdminPage);