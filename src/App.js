import React, { Component } from 'react';


import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './styles/app.scss';
import Header from './components/header';
import MainScreen from './screens/main';


const AppRouter = () => (
  <Router>
    <div>
      <Header></Header>
      <Route path="/" exact component={MainScreen} />
    </div>
  </Router>
);

export default AppRouter;
