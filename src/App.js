import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './webpages/Home';
import Signup from './webpages/authentication/Signup';
import SignupSuccess from './webpages/authentication/SignupSuccess';
import Login from './webpages/authentication/Login';
import Nav from './components/menu/Nav';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Nav></Nav>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/signup/success" component={SignupSuccess}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Switch>
    </>
  )
};

export default App;
