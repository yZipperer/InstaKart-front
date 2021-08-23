import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
//import {createProduct} from '../../../apiFunctions/product';

const CreateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [productName, setProductName] = useState("");

    const productForm = () => (
        <form>
            <input 
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="new category"
                onChange={event => setProductName(event.target.value)}
                value={productName}
                autoFocus
                required
            />
            <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-400 focus:outline-none my-1"
            >Create Product</button>
        </form>
    );

    const loadingProductForm = () => (
        <form>
            <input 
                type="text"
                className="block border border-blue-400 w-full p-3 rounded mb-4  animate-pulse"
                placeholder="new category"
                value={"loading ..."}
                autoFocus
                disabled
                required
            />
            <button
                type="submit"
                className="w-full text-center py-3 rounded text-white focus:outline-none my-1 bg-blue-400 animate-pulse"
                disabled
            >Loading ...</button>
        </form>
    );

    return (
        <div style={{height: "94.1vh"}} className="bg-gray-300 flex">
            <AdminSideNav></AdminSideNav>
            <div style={{height: "94.1vh"}} className="bg-gray-300 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
                    <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-4 mb-4 w-full">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            {loading ? (
                                loadingProductForm()
                            ) : (
                                productForm()
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default CreateProduct;