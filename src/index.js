import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/scss/remote/nucleo/css/nucleo.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/remote-react.scss";

import store from "./app-store/store";
import { Provider } from "react-redux";
import Home from "./pages/Home.js";
import RepoList from './pages/RepoList';
import RepoDetails from './pages/RepoDetails';
import ErrorBoundary from 'ErrorBoundary';

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>  
          <ErrorBoundary>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/repo-list/:username" component={RepoList} />
              <Route path="/repo-list/:username/details/:repo" component={RepoDetails} />
              <Redirect from="**" to="/" />
            </Switch>
          </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

reportWebVitals();
