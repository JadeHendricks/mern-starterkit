import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './layouts/Navigation';
import Base from './layouts/Base';
import Signup from './components/auth/Signup';

function App() {
  return (
    <Router>
      <Fragment>
        <Navigation />
        <Switch>
          <Route path='/' exact component={ Base } />
          <Route path='/signup' exact component={ Signup } />
          <Route path='/signin' exact component={ Base } />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
