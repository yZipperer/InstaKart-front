import React, { useEffect } from 'react';
import {Switch, Route} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {auth} from './firebase';
import {currentUser} from './apiFunctions/authentication';
import {useDispatch} from 'react-redux';

// Pages
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
import UpdateSubCategory from './webpages/admin/subCategories/UpdateSubCategory';
import CreateBrand from './webpages/admin/brands/CreateBrand';
import UpdateBrand from './webpages/admin/brands/UpdateBrand';
import CreateSubsidiaryBrand from './webpages/admin/subsidiaryBrand.js/CreateSubsidiaryBrand';
import UpdateSubsidiaryBrand from './webpages/admin/subsidiaryBrand.js/UpdateSubsidiaryBrand';
import CreateProduct from './webpages/admin/product/CreateProduct';
import Products from './webpages/admin/product/Products';
import UpdateProduct from './webpages/admin/product/UpdateProduct';
import NewArrivals from './webpages/NewArrivals';
import BestSellers from './webpages/BestSellers';
import Product from './webpages/Product';

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
        <Route exact path="/newarrivals" component={NewArrivals}></Route>
        <Route exact path="/bestsellers" component={BestSellers}></Route>
        <Route exact path="/product/:slug" component={Product}></Route>
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
        <AdminRoute exact path="/admin/subcategory/:slug" component={UpdateSubCategory}></AdminRoute>
        <AdminRoute exact path="/admin/brands" component={CreateBrand}></AdminRoute>
        <AdminRoute exact path="/admin/brand/:slug" component={UpdateBrand}></AdminRoute>
        <AdminRoute exact path="/admin/subsidiaryBrands" component={CreateSubsidiaryBrand}></AdminRoute>
        <AdminRoute exact path="/admin/subsidiaryBrand/:slug" component={UpdateSubsidiaryBrand}></AdminRoute>
        <AdminRoute exact path="/admin/createproduct" component={CreateProduct}></AdminRoute>
        <AdminRoute exact path="/admin/products" component={Products}></AdminRoute>
        <AdminRoute exact path="/admin/product/:slug" component={UpdateProduct}></AdminRoute>
      </Switch>
    </>
  );
};

export default App;
