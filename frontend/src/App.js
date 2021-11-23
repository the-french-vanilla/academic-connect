import React, { Component } from "react";
import "./App.css";
// import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
// import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
// import UpdateProject from "./components/Project/UpdateProject";
// import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
// import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
// import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";

import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import ForgotPassword from "./components/UserManagement/ForgotPassword";
import AccountRecovery from "./components/UserManagement/AccountRecovery";

import Feed from "./components/Layout/Feed";
import UserSettings from "./components/Layout/UserSettings";
import UserProfile from "./components/Layout/UserProfile";
import GroupProfile from "./components/Layout/GroupProfile";
import Messaging from "./components/Layout/Messaging";
import SearchResult from "./components/Layout/SearchResult";

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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              //Public Routes
            }
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/accountrecovery" component={AccountRecovery} />


              {/* <Route exact path="/feed" component={Feed} />
              <Route exact path="/settings" component={UserSettings} />
              <Route exact path="/ac/:username" component={UserProfile} />
              <Route exact path="/ac/:username/publications" component={UserProfile} />
              <Route exact path="/ac/:username/connections" component={UserProfile} />
              <Route exact path="/ac/:username/groups" component={UserProfile} />
              <Route exact path="/groups/:group_id" component={GroupProfile} />
              <Route exact path="/messaging/thread/:thread_id" component={Messaging} /> */}
            </Switch>

            {
              //Private Routes
            }
            {/* <Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard} />
              <SecuredRoute exact path="/addProject" component={AddProject} />
              <SecuredRoute
                exact
                path="/updateProject/:id"
                component={UpdateProject}
              />
              <SecuredRoute
                exact
                path="/projectBoard/:id"
                component={ProjectBoard}
              />
              <SecuredRoute
                exact
                path="/addProjectTask/:id"
                component={AddProjectTask}
              />
              <SecuredRoute
                exact
                path="/updateProjectTask/:backlog_id/:pt_id"
                component={UpdateProjectTask}
              />
            </Switch> */}

            <Switch>
              <SecuredRoute exact path="/feed" component={Feed} />
              <SecuredRoute exact path="/settings" component={UserSettings} />
              <SecuredRoute exact path="/ac/:username" component={UserProfile} />
              <SecuredRoute exact path="/ac/:username/publications" component={UserProfile} />
              <SecuredRoute exact path="/ac/:username/connections" component={UserProfile} />
              <SecuredRoute exact path="/ac/:username/groups" component={UserProfile} />
              <SecuredRoute exact path="/groups/:group_id" component={GroupProfile} />
              <SecuredRoute exact path="/messaging/thread/:thread_id" component={Messaging} />
              <SecuredRoute exact path="/search/results/all" component={SearchResult} />
            </Switch>

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
