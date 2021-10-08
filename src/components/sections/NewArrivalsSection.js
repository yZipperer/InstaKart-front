import React, {useEffect, useState} from 'react';
import {listProductsActive} from '../../apiFunctions/product';
import NewArrivalsHeading from '../headings/NewArrivalsHeading';
import ProductCardUser from '../cards/ProductCardUser';
import Pagination from '../pagination/Pagination';

const NewArrivalsSection = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect (() => {
        loadNewArrivals();
    }, []);

    const loadNewArrivals = () => {
        setLoading(true);
        listProductsActive("createdAt", "desc", 1, 4)
        .then(res => {
            setLoading(false);
            setNewArrivals(res.data);
        });
    };

    return (
        <>
            <NewArrivalsHeading />
            <div className="flex-1 flex flex-wrap">
                {newArrivals && newArrivals.map(product => (
                <ProductCardUser
                    product={product}
                    key={product._id}
                />
                ))}
            </div>
        </>
    )
};

export default NewArrivalsSection;