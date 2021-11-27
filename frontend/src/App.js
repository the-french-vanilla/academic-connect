import React, { Component } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import ForgotPassword from "./components/UserManagement/ForgotPassword";
import AccountRecovery from "./components/UserManagement/AccountRecovery";

import Feed from "./components/Layout/Feed";
import UserSettings from "./components/Layout/UserSettings";
import UserProfile from "./pages/UserProfile/index";
import Connections from "./pages/Connections/index";
import Pages from "./pages/Pages/index";
import Groups from "./pages/Groups/index";
import Events from "./pages/Events/index";
import Messaging from "./pages/Messaging/index";
import SearchResults from "./pages/SearchResults";
import GroupProfile from "./components/Layout/GroupProfile";
// import Messaging from "./components/Layout/Messaging";

import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecureRoute";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class NoMatch extends Component {
  render() {
    return (
      <div>
        <div style={{height: '10vh'}}></div>
        <h1>NoMatch</h1>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              {
                // Public Routes
              }
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/accountrecovery" component={AccountRecovery} />
              {
                // Private Routes
              }
              <SecuredRoute exact path="/feed" component={Feed} />
              <SecuredRoute exact path="/settings" component={UserSettings} />
              <SecuredRoute path="/ac/:username" component={UserProfile} />
              <SecuredRoute exact path="/group/:group_id" component={GroupProfile} />
              {/* <SecuredRoute exact path="/messaging/thread/:thread_id" component={Messaging} /> */}
              
              <SecuredRoute path="/messaging" component={Messaging} />
              <SecuredRoute path="/connections" component={Connections} />
              <SecuredRoute path="/pages" component={Pages} />
              <SecuredRoute path="/groups" component={Groups} />
              <SecuredRoute path="/events" component={Events} />
              <SecuredRoute path="/search/results" component={SearchResults} />

              {
                // Page not found
              }
              <Route component={NoMatch}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;