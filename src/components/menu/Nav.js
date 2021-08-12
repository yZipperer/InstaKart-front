import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import firebase from 'firebase';
import {useDispatch, useSelector} from 'react-redux';
import { Zoom } from "react-toastify";

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let dispatch = useDispatch();
  let rState = useSelector((rState) => {
    return rState;
  });
  let history = useHistory();

  const logout = () => {
    firebase.auth().signOut();

    dispatch({
      type: "LOGGED_OUT",
      payload: null
    });

    history.push("/login");
  };

    return (
      <>
          <nav className="bg-indigo-700 mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                  <div className="absolute flex items-center sm:hidden">
                    <button type="button" id="mobileMenuButton" className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                      <i className="fa fa-bars" aria-hidden="true"></i>
                    </button>
                  </div>

                  <div className="flex-1 flex items-center justify-start pl-10 sm:items-stretch">
                    <div className="flex-shrink-0 flex items-center">
                      <Link to='/' className="text-white text-2xl"><i className="fas fa-carrot pr-2"></i>InstaKart</Link>
                    </div>
                  </div>

                  <div className="absolute right-0 flex items-center pr-2 sm:ml-6 sm:pr-0">
                      {rState.user && (
                        <button className="p-1 h-8 w-8 rounded-full text-white hover:bg-blue-400 hidden hover:text-white sm:inline-block">
                          <i className="far fa-bell"></i>
                        </button>
                      )}
                      {!rState.user && (
                        <>
                          <Link to={'/login'} className="flex text-sm">
                            <span className="text-white flex items-center justify-center h-8 pl-4 pr-4 ml-2 rounded-full hover:text-white hover:bg-blue-400">Log In</span>
                          </Link>
                          <Link to={'/signup'} className="flex text-sm">
                            <span className="text-white flex items-center bg-blue-600 justify-center h-8 pl-4 pr-4 ml-2 rounded-full hover:text-white hover:bg-blue-400">Sign Up</span>
                          </Link>
                        </>
                      )}
                      
                      <div className="ml-3 relative">
                          <div className="dropdown">
                            {rState.user && (
                              <div className="flex text-sm">
                                <span className="text-white flex items-center justify-center h-8 pl-4 pr-4 ml-2 rounded-full hover:text-white hover:bg-blue-400">{rState.user.name}</span>
                              </div>
                            )}

                            <ul className="dropdown-menu absolute hidden text-gray-300 pt-1">
                              <li className="">
                                <Link className="bg-gray-100 hover:bg-gray-200 py-2 px-5 text-black block whitespace-no-wrap">Profile</Link>
                              </li>
                              {rState.user && rState.user.role === "user" && (
                                <>
                                  <li className="">
                                    <Link to="/user/openorders" className="bg-gray-100 hover:bg-gray-200 py-2 px-5 text-black block whitespace-no-wrap">Dashboard</Link>
                                  </li>
                                </>
                              )}
                              {rState.user && rState.user.role === "admin" && (
                                <>
                                  <li className="">
                                    <Link to="/admin/dashboard" className="bg-gray-100 hover:bg-gray-200 py-2 px-5 text-black block whitespace-no-wrap">Dashboard</Link>
                                  </li>
                                </>
                              )}
                              <li className="">                                  
                                <a href="#" onClick={logout} className="bg-gray-100 hover:bg-gray-200 text-black py-2 px-5 block whitespace-no-wrap">Sign out</a>
                              </li>
                            </ul>
                          </div>

                      </div>
                  </div>
                </div>
                {mobileMenuOpen ? (
                  <div className="sm:hidden bg-blue-400 w-full" id="mobileMenu">
                    <div className="mt-2 pb-3  space-y-1">
                      <a href="#" className="text-white hover:bg-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
                      <a href="#" className="text-white hover:bg-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">New and Trending</a>
                      <a href="#" className="text-white hover:bg-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Deals</a>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              
            </nav>
      </>
    );
};

export default Nav;