import React from 'react';
import {Link} from 'react-router-dom';
import WinterImage from '../../images/forestSnow.jpg';

const Winter = () => {
    return (
        <div className="flex items-center justify-between bg-white rounded-lg mt-2">
            <div className="float-left h-full w-1/2">
                <div className="mx-16 my-6">
                    <div className="py-2 text-6xl font-bold leading-none text-purple-700">
                        <h1>Shop Our Seasonal Catalog
                        </h1>
                    </div>
                    <div>
                        <p className="text-xl text-gray-600">
                            Our team has curated some of the best 
                            <br></br>
                            holiday products we have to offer
                        </p>
                    </div>
                    <div className="my-10">
                        <Link>
                            <span className="p-3 px-6 font-medium text-white bg-blue-500 border-4 border-transparent rounded-lg  hover:bg-blue-700">
                                Check it out
                                <i className="fas fa-arrow-right px-2"></i>
                            </span>
                        </Link>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <div className="w-1/2 h-full">
                <img src={WinterImage} alt="forest with snow" className="object-cover w-full h-full"/>
            </div>
        </div>

    );
};

export default Winter;