import React from 'react';
import SideNav from '../../components/menu/UserSideNav';
import Password from './Password';

const History = () => {
    return (
        <>
            <div style={{height: "94.1vh"}} class="bg-gray-300 flex">
                <SideNav />
                <Password />
            </div>
        </>
    )
};

export default History;