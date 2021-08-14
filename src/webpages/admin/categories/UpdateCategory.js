import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {updateCategory} from '../../../apiFunctions/category';

const UpdateCategory = () => {
    return (
        <div style={{height: "94.1vh"}} className="bg-gray-300 flex">
            <AdminSideNav></AdminSideNav>

        </div>
    );
};

export default UpdateCategory;