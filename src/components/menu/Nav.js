import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import firebase from 'firebase';
import {useDispatch} from 'react-redux';

const Nav = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

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
                    <button type="button" id="mobileMenuButton" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
                      <i class="fa fa-bars" aria-hidden="true"></i>
                    </button>
                  </div>

                  <div class="flex-1 flex items-center justify-start pl-10 sm:items-stretch">
                    <div class="flex-shrink-0 flex items-center">
                      <Link to='/' class="text-white text-2xl"><i class="fas fa-carrot pr-2"></i>InstaKart</Link>
                    </div>
                  </div>

                  <div class="absolute right-0 flex items-center pr-2 sm:ml-6 sm:pr-0">
                      <button class="p-1 h-8 w-8 rounded-full text-gray-400 hover:bg-gray-500 hidden hover:text-white sm:inline-block">
                        <i class="far fa-bell"></i>
                      </button>

                      <div class="ml-3 relative">
                          <div>
                              <button type="button" class="flex text-sm" id="profileMenuButton" onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                                  <img class="h-8 w-8 rounded-full" src="./images/avatar.jpg" alt="Profile Image" />
                                  <span class="text-gray-400 flex items-center justify-center h-8 pl-4 pr-4 ml-2 rounded-full hover:text-white hover:bg-gray-500">Admin</span>
                              </button>
                          </div>

                          {profileMenuOpen ? (
                            <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" id="profileMenu">
                              <a href="#" class="block px-4 py-2 text-sm text-gray-700">Profile</a>
                              <a href="#" class="block px-4 py-2 text-sm text-gray-700">Settings</a>
                              <a href="#" onClick={logout} class="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                          </div>
                          ) : (
                            <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" hidden id="profileMenu">
                              <a href="#" class="block px-4 py-2 text-sm text-gray-700">Profile</a>
                              <a href="#" class="block px-4 py-2 text-sm text-gray-700">Settings</a>
                              <a href="#" onClick={logout} class="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                            </div>
                          )}
                          
                      </div>
                  </div>
                </div>
            
              <div class="sm:hidden" hidden id="mobileMenu">
                <div class="px-2 pt-2 pb-3 space-y-1">
                  <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>
                  <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
                  <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
                </div>
              </div>
            </nav>
      </>
    );
};

export default Nav;