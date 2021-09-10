import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {listProducts} from '../../../apiFunctions/product';
import ProductCard from '../../../components/cards/ProductCard';

const Products = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        setLoading(true);
        listProducts(50)
            .then(res => {
                setProducts(res.data);
                console.log(products);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    };

    return (
        <div className="bg-gray-300 flex">
            <AdminSideNav></AdminSideNav>
            <div style={{height: "93.445vh"}} className="bg-gray-300 w-full overflow-auto">
                    <div className="container mx-auto flex-1 flex items-center justify-center px-2 mt-4 mb-4 max-w-2xl">
                        {products && products.map(product => (
                            <ProductCard
                                product={product}
                                key={product._id}
                            />
                        ))}

                    </div>
            </div>
        </div>
    );
};

export default Products;