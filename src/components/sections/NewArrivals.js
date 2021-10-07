import React, {useEffect, useState} from 'react';
import {listProductsActive} from '../../apiFunctions/product';
import NewArrivalsHeading from '../headings/NewArrivalsHeading';
import ProductCardUser from '../cards/ProductCardUser';
import Pagination from '../pagination/Pagination';
import {getProductNum} from '../../apiFunctions/product';
import {useSelector} from 'react-redux';

const NewArrivals = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [newArrivalsCount, setNewArrivalsCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [resultsPerPage, setResultsPerPage] = useState(4);
    let [page, setPage] = useState(1);

    let rState = useSelector((rState) => {
        return rState;
    });

    useEffect (() => {
        loadNewArrivals(page);
    }, []);

    const loadNewArrivals = (pageNum) => {
        setLoading(true);
        listProductsActive("createdAt", "desc", pageNum, resultsPerPage)
        .then(res => {
            setLoading(false);
            setNewArrivals(res.data);
            setNewArrivalsCount(res.data.length);
        });
    };

    const handlePageChange = (direction) => {
        console.log(page);
        if (direction === "Next") {
            let newPageNum = page;
            newPageNum++;
            setPage(newPageNum);
            loadNewArrivals(newPageNum);
        } else if (direction === "Previous" && page > 1) {
            let newPageNum = page;
            newPageNum--;
            setPage(newPageNum);
            loadNewArrivals(newPageNum);
        }
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
            <Pagination 
                handlePageChange={handlePageChange}
                newArrivalsCount={newArrivalsCount}
            />
        </>
    )
};

export default NewArrivals;