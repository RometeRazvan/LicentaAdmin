import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

export interface AppProps {
  
}
 
export interface AppState {
  
}
 
class App extends React.Component<AppProps, AppState> {
  render() { 
    return(
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
              <LoginPage />
          </Route>
          <Route exact path="/forgotPassword">
              <ForgotPasswordPage />
          </Route>
          <Route exact path = "/resetPassword/:token">
              <ResetPasswordPage />
          </Route>
          <Route exact path = "/main" >
              <AdminPage />
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
    
  )}
}
 
export default App;