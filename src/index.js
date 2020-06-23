import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

//Routes
import Home from './Routes/home';
import Treatment from './Routes/treatment';
import Timeline from './Routes/timeline';
import Script from './Routes/script';
import Statistics from './Routes/statistics';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/treatment" component={Treatment} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/script" component={Script} />
      <Route path="/statistics" component={Statistics} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
