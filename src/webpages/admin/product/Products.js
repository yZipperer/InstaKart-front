import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {listProducts, deleteProduct} from '../../../apiFunctions/product';
import ProductCard from '../../../components/cards/ProductCardAdmin';

const Products = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    let rState = useSelector((rState) => {
        return rState;
    });

    const getProducts = () => {
        setLoading(true);
        listProducts(50, rState.user.token)
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

    const handleDeletion = (slug) => {
        setLoading(true);
        if(window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(slug, rState.user.token)
            .then(res => {
                setLoading(false);
                getProducts();
                toast.success(`Product "${res.data.name}" has been Deleted`);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })
        }
    };

    return (
        <div className="bg-gray-300 flex">
            <AdminSideNav></AdminSideNav>
            <div style={{height: "93.445vh"}} className="bg-gray-300 w-full overflow-auto">
                    <div className="container mx-auto flex-1 flex items-center justify-center px-2 mt-4 mb-4 flex-wrap w-full">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            products ? (
                                <p>No Products</p>
                            ) : (
                                products && products.map(product => (
                                    <ProductCard
                                        product={product}
                                        key={product._id}
                                        handleDeletion={handleDeletion}
                                    />
                                ))
                            )
                        )}

                    </div>
            </div>
        </div>
    );
};

export default Products;