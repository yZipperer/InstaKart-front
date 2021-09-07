import React from 'react';
import {Link , useLocation} from 'react-router-dom';

const IsActive = (path) => {
    const location = useLocation();
    if(location.pathname === path) return "flex w-full justify-between text-gray-200 hover:text-gray-300 cursor-pointer items-center mb-6"
    else return "flex w-full justify-between text-gray-400 hover:text-gray-300 cursor-pointer items-center mb-6"
};

const AdminSideNav = () => {
    return (
        <div style={{height: "93.445vh"}} className="w-64 absolute sm:relative bg-gray-800 sm:inline-block shadow h-full flex-col justify-between flex z-10">
            <div className="px-8">
                <ul className="mt-12">
                    <Link to="/admin/dashboard" className={IsActive("/admin/dashboard")}>
                        <div className="flex items-center">
                            <i class="fas fa-th"></i>
                            <span className="text-sm ml-2">Dashboard</span>
                        </div>
                    </Link>
                    <Link to="/admin/products" className={IsActive("/admin/products")}>
                        <div className="flex items-center">
                            <i class="fas fa-boxes"></i>
                            <span className="text-sm ml-2">Products</span>
                        </div>
                    </Link>
                    <div id="productsCollapse" className="pl-8">
                        <Link to="/admin/createproduct" className={IsActive("/admin/createproduct")}>
                            <div className="flex items-center">
                                <i class="fas fa-plus"></i>
                                <span className="text-sm ml-2">Create Product</span>
                            </div>
                        </Link>
                    </div>
                    <Link to="/admin/categories" className={IsActive("/admin/categories")}>
                        <div className="flex items-center">
                            <i class="far fa-object-group"></i>
                            <span className="text-sm ml-2">Categories</span>
                        </div>
                    </Link>
                    <div id="productsCollapse" className="pl-8">
                        <Link to="/admin/subcategories" className={IsActive("/admin/subcategories")}>
                            <div className="flex items-center">
                                <i class="fas fa-plus"></i>
                                <span className="text-sm ml-2">Sub Categories</span>
                            </div>
                        </Link>
                    </div>
                    <Link to="/admin/brands" className={IsActive("/admin/brands")}>
                        <div className="flex items-center">
                            <i class="far fa-object-group"></i>
                            <span className="text-sm ml-2">Brands</span>
                        </div>
                    </Link>
                    <div id="productsCollapse" className="pl-8">
                        <Link to="/admin/subsidiaryBrands" className={IsActive("/admin/subsidiaryBrands")}>
                            <div className="flex items-center">
                                <i class="fas fa-plus"></i>
                                <span className="text-sm ml-2">Subsidiary Brands</span>
                            </div>
                        </Link>
                    </div>
                    <Link to="/admin/coupons" className={IsActive("/admin/coupons")}>
                        <div className="flex items-center">
                            <i class="fas fa-ad"></i>
                            <span className="text-sm ml-2">Coupons</span>
                        </div>
                    </Link>
                    <Link to="/user/settings" className={IsActive("/user/settings")}>
                        <div className="flex items-center">
                            <i class="fas fa-cogs"></i>
                            <span className="text-sm ml-2">Settings-Password</span>
                        </div>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default AdminSideNav;