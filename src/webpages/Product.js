import React, {useEffect, useState} from 'react';
import {individualProduct} from '../apiFunctions/product';
import ProductCardLarge from '../components/cards/ProductCardLarge';

const Product = ({match}) => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        setLoading(true);
        await individualProduct(match.params.slug)
        .then(res => {
            console.log("data", res.data);
            setProduct(res.data);
            setLoading(false);
        });
    };

    return (
        <div class="bg-gray-300 pb-8 sm:pb-16 pt-6 sm:pt-12 ">
            {loading ? (
                <>Loading/...</>
            ) : (
                <ProductCardLarge
                    product={product}
                />
            )}
        </div>
    )
};

export default Product;