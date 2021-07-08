import './App.css';
import Home from './components/page/Home';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import VerifyCode from './components/auth/VerifyCode';
import ResetPassword from './components/auth/ResetPassword';
import PrivateRoute from './components/routes/PrivateRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
      {(() => {
        if (localStorage.getItem("id")) {
          return (
            <PrivateRoute path="/" component={Home}>
            </PrivateRoute>
          )
        } 
        else {
          return (
            <Route exact path="/">
            <Login />
          </Route> 
          )
        }
      })()}
      <Route exact path="/">
        <Login />
      </Route>  
      <Route exact path="/forgot-password">
        <ForgotPassword />
      </Route>  
      <Route exact path="/verify-code">
        <VerifyCode />
      </Route> 
      <Route exact path="/reset-password">
        <ResetPassword />
      </Route> 
      <PrivateRoute path="/admin" component={Home}>
      </PrivateRoute>
    </Switch>
  </Router>
  );
}
export default App;
