import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

//Routes
import Home from './Routes/home';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" render={() => (<Home />)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
