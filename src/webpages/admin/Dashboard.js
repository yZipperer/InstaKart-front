import React from 'react';
import AdminSideNav from '../../components/menu/AdminSideNav';

const AdminDashboard = () => {
    return (
        <div className="bg-gray-300">
            <AdminSideNav></AdminSideNav>
            <h1>Admin Test</h1>
        </div>
    );
};

export default AdminDashboard;