import React, {useEffect, useState} from 'react';
import {individualProduct} from '../apiFunctions/product';

const Product = ({match}) => {
    const [product, setProduct] = useState({});
    const {slug} = match.params;

    useEffect (() => {
        loadProduct();
    }, [slug]);

    const loadProduct = () => {
        individualProduct(slug).then(res => {
            setProduct(res.data);
        });
    };

    return (
        <div style={{height: "94.1vh"}} class="bg-gray-300 h-screen">

        </div>
    )
};

export default Product;