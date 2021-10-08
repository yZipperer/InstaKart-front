import React, {useEffect, useState} from 'react';
import {listProductsActive} from '../../apiFunctions/product';
import NewArrivalsHeading from '../headings/NewArrivalsHeading';
import ProductCardUser from '../cards/ProductCardUser';
import BestSellersHeading from '../headings/BestSellersHeading';

const BestSellersSection = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect (() => {
        loadBestSellers();
    }, []);

    const loadBestSellers = () => {
        setLoading(true);
        listProductsActive("sold", "desc", 1, 4)
        .then(res => {
          setLoading(false);
          setBestSellers(res.data);
        });
    };

    return (
        <>
            <BestSellersHeading />
            <div className="flex-1 flex flex-wrap">
                {bestSellers && bestSellers.map(product => (
                <ProductCardUser
                    product={product}
                    key={product._id}
                />
                ))}
            </div>
        </>
    )
};

export default BestSellersSection;