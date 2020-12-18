import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthRoute from "Components/AuthRoute"

import { version, description } from "../package.json";

// pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Test from "./pages/Test";

// http request error
import _404 from "./pages/error/_404"

// library style
import "toastify-js/src/toastify.css"

// my style
import "./style/index.css";

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <AuthRoute exact path="/" component={Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>

        <AuthRoute path="/test" component={Test}/>

        <Route component={_404} />
      </Switch>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);

console.log(`%c${description} v${version}`, "color:#1483ff;font-family: 'NanumSquareRound',sans-serif;font-size:36px;font-weight:900");

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

document.addEventListener("touchstart", event => {
  if(event.touches.length > 1) {
      console.log("zoom plz stahp");
      event.preventDefault();
      event.stopPropagation(); // maybe useless
  }
}, {passive: false});