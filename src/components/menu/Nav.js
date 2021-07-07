import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import firebase from 'firebase';
import {useDispatch} from 'react-redux';

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let dispatch = useDispatch();
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
          <nav class="bg-blue-500 mx-auto px-2 sm:px-6 lg:px-8">
                <div class="relative flex items-center justify-between h-16">
                  <div class="absolute flex items-center sm:hidden">
                    <button type="button" id="mobileMenuButton" class="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                      <i class="fa fa-bars" aria-hidden="true"></i>
                    </button>
                  </div>

                  <div class="flex-1 flex items-center justify-start pl-10 sm:items-stretch">
                    <div class="flex-shrink-0 flex items-center">
                      <Link to='/' class="text-white text-2xl"><i class="fas fa-carrot pr-2"></i>InstaKart</Link>
                    </div>
                  </div>

                  <div class="absolute right-0 flex items-center pr-2 sm:ml-6 sm:pr-0">
                      <button class="p-1 h-8 w-8 rounded-full text-white hover:bg-blue-400 hidden hover:text-white sm:inline-block">
                        <i class="far fa-bell"></i>
                      </button>

                      <div class="ml-3 relative">
                          <div class="dropdown">
                            <div class="flex text-sm">
                              <span class="text-white flex items-center justify-center h-8 pl-4 pr-4 ml-2 rounded-full hover:text-white hover:bg-blue-400">Admin</span>
                            </div>

                            <ul className="dropdown-menu absolute hidden text-gray-300 pt-1">
                              <li className="">
                                <Link className="bg-gray-100 hover:bg-gray-200 py-2 px-5 text-black block whitespace-no-wrap">Profile</Link>
                              </li>
                              <li className="">                                  
                                <a href="#" onClick={logout} class="bg-gray-100 hover:bg-gray-200 text-black py-2 px-5 block whitespace-no-wrap">Sign out</a>
                              </li>
                            </ul>
                          </div>

                      </div>
                  </div>
                </div>
                {mobileMenuOpen ? (
                  <div class="sm:hidden bg-blue-400 w-full" id="mobileMenu">
                    <div class="mt-2 mb-3  space-y-1">
                      <a href="#" class="text-white hover:bg-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
                      <a href="#" class="text-white hover:bg-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">New and Trending</a>
                      <a href="#" class="text-white hover:bg-blue-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Deals</a>
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