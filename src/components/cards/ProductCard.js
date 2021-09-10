import React from 'react';

const ProductCard = ({product}) => {
    const {
        name,
        images,
        price
    } = product

    const imageUrl = images && images.length ? images[0].url : "";
    return (
        <div style={{"max-width": "360px", "min-width": "360px"}} className="bg-white rounded shadow-md text-black w-full m-2">
            <div class="flex items-center justify-center flex-wrap">
                <div 
                    style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", "max-height": "360px", "min-height": "360px"}}
                    className="h-full w-full"
                >
                    <span className="float-right">Hello</span>
                </div>
                <div class="p-5">
                    <h1 class="text-xl font-bold">{name}</h1>
                    <p class="mt-2 text-lg font-semibold text-gray-600">${price}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;