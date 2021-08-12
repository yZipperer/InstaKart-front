import React from 'react';
import {Link , useLocation} from 'react-router-dom';

const IsActive = (path) => {
    const location = useLocation();
    if(location.pathname === path) return "flex w-full justify-between text-gray-200 hover:text-gray-300 cursor-pointer items-center mb-6"
    else return "flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6"
};

const AdminSideNav = () => {
    return (
        <div style={{height: "93.445vh"}} className="w-64 absolute sm:relative bg-gray-800 hidden sm:inline-block shadow h-full flex-col justify-between flex z-10">
            <div className="px-8">
                <ul className="mt-12">
                    <li className={IsActive("/admin/dashboard")}>
                        <Link to="/admin/dashboard" className="flex items-center">
                            <span className="text-sm ml-2">Dashboard</span>
                        </Link>
                        <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">8</div>
                    </li>
                    <li className={IsActive("/admin/products")}>
                        <Link to="/admin/products" className="flex items-center">
                            <span className="text-sm ml-2">Products</span>
                        </Link>
                        <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">3</div>
                    </li>
                    <div id="productsCollapse" className="pl-8">
                        <li className={IsActive("/admin/createproduct")}>
                            <Link to="/admin/createproduct" className="flex items-center">
                                <i class="far fa-plus-square"></i>
                                <span className="text-sm ml-2">Create Product</span>
                            </Link>
                        </li>
                    </div>
                    <li className={IsActive("/admin/categories")}>
                        <Link to="/admin/categories" className="flex items-center">
                            <span className="text-sm ml-2">Categories</span>
                        </Link>
                        <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">3</div>
                    </li>
                    <li className={IsActive("/admin/subcategories")}>
                        <Link to="/admin/subcategories" className="flex items-center">
                            <span className="text-sm ml-2">Sub Categories</span>
                        </Link>
                        <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">3</div>
                    </li>
                    <li className={IsActive("/admin/coupons")}>
                        <Link to="/admin/coupons" className="flex items-center">
                            <span className="text-sm ml-2">Coupons</span>
                        </Link>
                        <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">3</div>
                    </li>
                    <li className={IsActive("/user/settings")}>
                        <Link to="/user/settings" className="flex items-center">
                            <span className="text-sm ml-2">Settings-Password</span>
                        </Link>
                        <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">3</div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminSideNav;