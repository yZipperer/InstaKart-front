import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './webpages/Home';
import Signup from './webpages/authentication/Signup';
import Login from './webpages/authentication/Login';
import Nav from './components/menu/Nav';

const App = () => {
  return (
    <>
      <Nav></Nav>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Switch>
    </>
  )
};

export default App;
