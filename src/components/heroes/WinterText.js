import React from 'react';

const WinterText = () => {
    return (
        <div className="flex bg-gray-100 py-12 justify-center rounded-lg mt-2 mb-4">
            <div className="p-12 text-center max-w-2xl">
                <div className="md:text-3xl text-3xl font-bold">
                    Shop Our Seasonal Catalog
                </div>
                <div className="text-xl font-normal mt-4">
                    Our team has curated the best holiday products we have to offer.
                </div>
                <div className="mt-6 flex justify-center h-12 relative">
                    <div 
                        className="flex shadow-md font-medium absolute py-2 px-4 text-green-100 cursor-pointer bg-blue-500 hover:bg-blue-700 rounded text-lg"
                    >
                        Holiday Catalog <i className="fas fa-arrow-right py-2 px-2"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WinterText;