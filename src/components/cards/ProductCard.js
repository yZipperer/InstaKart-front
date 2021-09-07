import React from 'react';

const ProductCard = ({product}) => {
    const {
        name,
        images,
        price
    } = product
    return (
        <div style={{"max-width": "360px"}} className="bg-white rounded shadow-md text-black w-full">
            <div class="flex items-center justify-center flex-wrap">
                <img 
                    src={images && images.length ? images[0].url : ""} 
                    width="360" 
                    height="360"
                />
                <div class="p-5">
                    <h1 class="text-xl font-bold">{name}</h1>
                    <p class="mt-2 text-lg font-semibold text-gray-600">${price}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;