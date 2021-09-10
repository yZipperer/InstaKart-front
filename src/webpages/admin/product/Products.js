import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {listProducts} from '../../../apiFunctions/product';
import ProductCard from '../../../components/cards/ProductCard';
import {deleteProduct} from '../../../apiFunctions/product';

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

    const handleDeletion = (slug) => {
        if(window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(slug, rState.user.token)
            .then(res => {
                getProducts();
                toast.success(`Product "${res.data.name}" has been Deleted`);
            })
            .catch(err => {
                console.log(err);
                if(err.response.status === 400) toast.error(err.response.data);
            })
        }
    };

    return (
        <div className="bg-gray-300 flex">
            <AdminSideNav></AdminSideNav>
            <div style={{height: "93.445vh"}} className="bg-gray-300 w-full overflow-auto">
                    <div className="container mx-auto flex-1 flex items-center justify-center px-2 mt-4 mb-4 flex-wrap w-full">
                        {products && products.map(product => (
                            <ProductCard
                                product={product}
                                key={product._id}
                                handleDeletion={handleDeletion}
                            />
                        ))}

                    </div>
            </div>
        </div>
    );
};

export default Products;