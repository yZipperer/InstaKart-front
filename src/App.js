import React, { useEffect } from 'react';
import {Switch, Route} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from './firebase';
import {currentUser} from './apiFunctions/authentication';
import {useDispatch} from 'react-redux';

// Components
import Home from './webpages/Home';
import Signup from './webpages/authentication/Signup';
import SignupSuccess from './webpages/authentication/SignupSuccess';
import Login from './webpages/authentication/Login';
import ForgotPassword from './webpages/authentication/ForgotPassword';
import Nav from './components/menu/Nav';
import History from './webpages/user/History';
import UserRoute from './components/routes/UserRoute';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const remove = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const tokenResult = await user.getIdTokenResult();
        
        currentUser(tokenResult.token)
          .then((res) => {
              dispatch({
                  type: "LOGGED_IN",
                  payload: {
                      _id: res.data._id,
                      name: res.data.name,
                      email: res.data.email,
                      token: tokenResult.token,
                      role: res.data.role
                  }
              });
          })
          .catch((err) => console.log(err));
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
        <Route exact path="/forgot/password" component={ForgotPassword}></Route>
        <UserRoute exact path="/user/history" component={History}></UserRoute>
      </Switch>
    </>
  );
};

export default App;
