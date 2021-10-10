import React from 'react';
import noImage from '../../images/no-image-found.png';
import {Link} from 'react-router-dom';

const ProductCardUser = ({product}) => {
    const {
        name,
        mainImage,
        images,
        price,
        slug
    } = product;

    const imageUrl = images && images.length ? images[0].url : noImage;
    const mainImageUrl = mainImage && mainImage.length ? mainImage[0].url : noImage;
    return (
        <div style={{"max-width": "360px", "min-width": "360px"}} className="bg-white rounded-lg shadow-md text-black w-full m-2">
            <Link to={`/product/${slug}`}>
                <div class="flex items-center justify-center flex-wrap">
                    <div 
                        style={{backgroundImage: `url(${mainImageUrl})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat", "max-height": "360px", "min-height": "360px"}}
                        className="h-full w-full rounded-lg"
                    >
                        <span className="float-right border-gray-500 border-2 hover:border-gray-700 hover:border-4 flex items-center flex-wrap rounded-full m-2  text-lg">
                            <i class="far fa-heart p-3 text-gray-500 hover:text-red-700 hover:bg-red-200 hover:bg-opacity-30 rounded-full"></i>
                            <Link to={`/`}>
                                <i class="fas fa-cart-plus p-3 text-gray-500 hover:text-blue-700 hover:bg-blue-200 hover:bg-opacity-30 rounded-full"></i>
                            </Link>
                        </span>
                    </div>
                    <div class="p-5">
                        <h1 class="text-xl font-bold">{name}</h1>
                        <p class="mt-2 text-lg font-semibold text-gray-600">${price}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCardUser;