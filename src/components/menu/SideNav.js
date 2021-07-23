import React from 'react';
import {Link} from 'react-router-dom';

const SideNav = () => {
    return (
        <div style={{height: "93.445vh;"}} className="w-64 absolute sm:relative bg-gray-800 hidden sm:inline-block shadow h-full flex-col justify-between flex z-10">
            <div className="px-8">
                <ul className="mt-12">
                    <li className="flex w-full justify-between text-gray-200 cursor-pointer items-center mb-6">
                        <Link to="/user/history" className="flex items-center">
                            <span className="text-sm ml-2">History</span>
                        </Link>
                    </li>
                    <li className="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                        <Link to="/user/settings" className="flex items-center">
                            <span className="text-sm ml-2">Settings</span>
                        </Link>
                    </li>
                    <li className="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                        <Link to="/user/wishlist" className="flex items-center">
                            <span className="text-sm ml-2">Wish List</span>
                        </Link>
                    </li>
                    <li className="flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6">
                        <Link to="/user/openorders" className="flex items-center">
                            <span className="text-sm ml-2">Open Orders</span>
                        </Link>
                        <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">8</div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideNav;