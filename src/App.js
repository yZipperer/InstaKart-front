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
import AdminRoute from './components/routes/AdminRoute';
import Settings from './webpages/user/Settings';
import WishList from './webpages/user/WishList';
import OpenOrders from './webpages/user/OpenOrders';
import AdminDashboard from './webpages/admin/Dashboard';
import CreateCategory from './webpages/admin/categories/CreateCategory';
import UpdateCategory from './webpages/admin/categories/UpdateCategory';
import CreateSubCategory from './webpages/admin/subCategories/CreateSubCategory';

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
        <UserRoute exact path="/user/settings" component ={Settings}></UserRoute>
        <UserRoute exact path="/user/wishlist" component={WishList}></UserRoute>
        <UserRoute exact path="/user/openorders" component={OpenOrders}></UserRoute>
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}></AdminRoute>
        <AdminRoute exact path="/admin/categories" component={CreateCategory}></AdminRoute>
        <AdminRoute exact path="/admin/category/:slug" component={UpdateCategory}></AdminRoute>
        <AdminRoute exact path="/admin/subcategories" component={CreateSubCategory}></AdminRoute>
      </Switch>
    </>
  );
};

export default App;
