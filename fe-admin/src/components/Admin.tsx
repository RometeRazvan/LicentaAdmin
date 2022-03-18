import { AppBar, Box, Button, CircularProgress, createStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export interface AdminProps {
    classes: any;
    isLoading: boolean;
    dateTable: any;
    dateSearch: any;
    nume: any;
    logOut() : any;
    dateFrom: string;
    dateTo: string;
    handleChange(data: any): void;
    actual: number;
    willCancel: number;
    cancelled: number;
    isLoadingDate: boolean;
    getStatus(): void;
}
 
export interface AdminState {
    
}

const styles = createStyles({
    tBar: {
        display: 'flex',
        width: '100%'
    },
    item: {
        flexGrow: 1,
    },
    space: {
        flexGrow: 3000
    },
    table: {
        display: 'inline-flex',
        width: '100%',
        marginTop: 'auto',
        marginBottom: 'auto',
        flexDirection: 'column',
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    calendar: {
        marginTop:'10%',
        display: 'flex',
        flexDirection: 'column',
        allignItems: 'center'
    },
    valueDisplay: {
        display: 'inline-block',
        color: 'white',
        padding: '20px',
        marginTop: '4%',
        textAlign: 'center'
    }
});
 
class Admin extends React.Component<AdminProps, AdminState> {

    handleData = (type: any) => (event: any) => {
        this.props.handleChange({
            [type]: event.target.value,
        });
    };

    render() { 
        const {classes, nume, dateFrom, dateTo, actual, willCancel, cancelled} = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar className = {classes.tbar}>
                        <Typography variant="h6" className = {classes.item}>
                            Admin Page
                        </Typography>
                        <div className = {classes.space} />
                        <Typography variant="h6" className = {classes.item}>
                            {nume}
                        </Typography>
                        <div className = {classes.item}>
                            <PersonIcon style = {{marginLeft: '20%'}}/>
                        </div>
                        <Button color="inherit" className = {classes.item} onClick = {this.props.logOut}>Log Out</Button>
                    </Toolbar>
                </AppBar>

                <div className = {classes.box}>
                    <div>
                        <div className = {classes.table}>
                            <TableContainer>
                                <Table aria-label = "simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell  align="left">Week</TableCell>
                                            <TableCell align="center">Predicted</TableCell>
                                            <TableCell align="center">Predicted Max</TableCell>
                                            <TableCell align="center">Actual</TableCell>
                                            <TableCell align="center">Will Cancel (?)</TableCell>
                                            <TableCell align="right">Cancelled</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    {this.props.isLoading ?
                                        <div />
                                        :
                                        <TableBody>
                                            {this.props.dateTable.map((row: any) => (
                                                <TableRow>
                                                    <TableCell align="left">{row[0]}</TableCell>
                                                    <TableCell align="center">{row[1]}</TableCell>
                                                    <TableCell align="center">{row[2]}</TableCell>
                                                    <TableCell align="center">{row[3]}</TableCell>
                                                    <TableCell align="center">{row[4]}</TableCell>
                                                    <TableCell align="right" style={{color: 'red'}}>{row[5]}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    }
                                </Table>
                            </TableContainer>
                            {this.props.isLoading ? <CircularProgress style={{marginLeft:'auto', marginRight:'auto', marginTop: '5%'}} /> : <div />}
                        </div>
                        <div>
                            Weeks - Week number for wich the prediction has been made (starts witch current week)
                        </div>
                        <div>
                            Predicted - Number of visitors that heve been predicted to arrive at the hotel in each respective week
                        </div>
                        <div>
                            Predicted Max - Number of visitors that heve been predicted to arrive at the hotel in each respective week after 
                        </div>
                        <div>
                            Actual - The actual number of hotel guests
                        </div>
                        <div>
                            Will Cancel - The number of bookings that may be cancelled
                        </div>
                        <div>
                            Cancelled - The number of bookings that have been cancelled
                        </div>
                    </div>
                    <div className = {classes.calendar}>
                        <div style ={{display:'flex', flexDirection: 'row'}}>
                            <TextField
                                id="date"
                                label="From"
                                type="date"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                value = {dateFrom}
                                onChange = {this.handleData('dateFrom')}
                            />
                            <TextField
                                id="date"
                                label="To"
                                type="date"
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                style={{marginLeft:'5%'}}
                                value = {dateTo}
                                onChange = {this.handleData('dateTo')}
                            />
                            <Button color="inherit" className = {classes.item} onClick = {this.props.getStatus}> <ArrowForwardIcon /> </Button>
                        </div>
                        <div style ={{width: '100%'}}>
                            {this.props.isLoadingDate ?
                                <div />
                                :
                                <div style = {{display: 'flex', flexDirection: 'column'}}>
                                    <Box bgcolor="success.main" className = {classes.valueDisplay}>Actual: {actual}</Box>
                                    <Box bgcolor="warning.main" className = {classes.valueDisplay}>Will cancel: {willCancel}</Box>
                                    <Box bgcolor="secondary.main" className = {classes.valueDisplay}>Cancelled: {cancelled}</Box>
                                </div>
                            }
                        </div>
                        {this.props.isLoadingDate ?
                                <CircularProgress style={{marginLeft:'auto', marginRight:'auto', marginTop: '5%'}} />
                                :
                                <div />
                            }
                    </div>
                </div>
            </div>
        );
    }
}
 
export default withStyles(styles)(Admin);