import React from 'react';
import {Link} from 'react-router-dom';

const bestSellersHeading = () => {
    return (
        <div className="flex bg-gray-100 py-8 justify-center rounded-lg mt-2 mb-4">
            <div className="text-center max-w-2xl">
            <Link to={`/bestsellers`}>
                <div className="md:text-3xl text-3xl font-bold flex">
                    <p>Best Sellers</p>
                    <i className="fas fa-chevron-right pt-1 pl-6"></i>
                </div>
            </Link>
            </div>
        </div>
    );
};

export default bestSellersHeading;