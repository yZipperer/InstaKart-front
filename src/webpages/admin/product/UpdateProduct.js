import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import {individualProduct} from '../../../apiFunctions/product';
import {listCategories, individualCategorySubCategories} from '../../../apiFunctions/category';
import {listBrands, individualBrandSubsidiaryBrand} from '../../../apiFunctions/brand';

const productState = {
    name: "",
    description: "",
    images: [],
    price: "",
    pricePerUnit: "",
    quantity: "",
    suggestedQuantity: "",
    category: "",
    subCategories: [],
    brand: "",
    subsidiaryBrands: [],
    shipping: "Yes",
    dimensionLength: null,
    dimensionWidth: null,
    dimensionHeight: null,
    weight: "",
    origin: "United States",
    active: true,
    taxable: true,
    seasonal: "All"
}

const UpdateProduct = ({match}) => {
    const [productInfo, setProductInfo] = useState(productState);
    const rState = useSelector((state) => ({...state}));

    useEffect(() => {
        getProduct()
    }, []);

    const getProduct = () => {
        individualProduct(match.params.slug)
        .then(product => {
            setProductInfo({...productInfo, ...product.data});
        });
    };

    return (
        <div className="bg-gray-300 flex">
            <AdminSideNav></AdminSideNav>
            <div style={{height: "93.445vh"}} className="bg-gray-300 w-full overflow-auto">
                    <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-4 mb-4 max-w-2xl">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            {JSON.stringify(productInfo)}
                        </div>
                </div>
            </div>
        </div>
    )
};

export default UpdateProduct;