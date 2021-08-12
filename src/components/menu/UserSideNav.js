import React from 'react';
import {useSelector} from 'react-redux';
import {Link , useLocation} from 'react-router-dom';

const IsActive = (path) => {
    const location = useLocation();
    if(location.pathname === path) return "flex w-full justify-between text-gray-200 hover:text-gray-300 cursor-pointer items-center mb-6"
    else return "flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6"
};

const UserSideNav = () => {
    let rState = useSelector((rState) => {
        return rState;
    });

    return (
        <div style={{height: "93.445vh"}} className="w-64 absolute sm:relative bg-gray-800 hidden sm:inline-block shadow h-full flex-col justify-between flex z-10">
            <div className="px-8">
                <ul className="mt-12">
                    {rState.user && rState.user.role === "admin" ? (
                        <>
                        </>
                    ) : (
                        <>
                            <li className={IsActive("/user/openorders")}>
                        <Link to="/user/openorders" className="flex items-center">
                            <span className="text-sm ml-2">Open Orders</span>
                        </Link>
                        <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">8</div>
                        </li>
                        <li className={IsActive("/user/wishlist")}>
                            <Link to="/user/wishlist" className="flex items-center">
                                <span className="text-sm ml-2">Wish List</span>
                            </Link>
                        </li>
                        <li className={IsActive("/user/history")}>
                            <Link to="/user/history" className="flex items-center">
                                <span className="text-sm ml-2">History</span>
                            </Link>
                        </li>
                        </>
                    )}
                    <li className={IsActive("/user/settings")}>
                        <Link to="/user/settings" className="flex items-center">
                            <span className="text-sm ml-2">Settings</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserSideNav;