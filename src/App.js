import React, { useEffect } from 'react';
import {Switch, Route} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from './firebase';
import {useDispatch} from 'react-redux';

// Components
import Home from './webpages/Home';
import Signup from './webpages/authentication/Signup';
import SignupSuccess from './webpages/authentication/SignupSuccess';
import Login from './webpages/authentication/Login';
import Nav from './components/menu/Nav';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const remove = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const tokenResult = await user.getIdTokenResult();
        
        dispatch({
          type: "LOGGED_IN",
          payload: {
            name: user.displayName,
            email: user.email,
            token: tokenResult.token
          }
        });
      };
    });
    return () => remove();
  }, []);
  
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
  );
};

export default App;
