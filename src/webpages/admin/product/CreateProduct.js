import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {createProduct} from '../../../apiFunctions/product';
import {listCategories} from '../../../apiFunctions/category';
import CreateProductForm from '../../../components/forms/CreateProductForm';

const productState = {
    name: "",
    description: "",
    images: [],
    price: "",
    pricePerUnit: "",
    quantity: "",
    suggestedQuantity: "",
    categories: [],
    category: "",
    subCategories: [],
    brands: [],
    subsidiaryBrands: [],
    brand: "",
    subsidiaryBrand: "",
    shipping: "Yes",
    dimensionWidth: null,
    dimensionHeight: null,
    dimensionDepth: null,
    weight: "",
    origin: "United States",
    active: true,
    taxable: true
}

const CreateProduct = ({history}) => {
    const [loading, setLoading] = useState(false);
    const [productInfo, setProductInfo] = useState(productState);

    const rState = useSelector((state) => ({...state}));

    useEffect(() => {
        getCategories();
    }, []);
    
    const getCategories = () => {
        listCategories({filter: "alphabet"})
        .then(category => setProductInfo({...productInfo, categories: category.data}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createProduct(productInfo, rState.user.token)
        .then(res => {
            console.log(res);
            toast.success(`Product "${res.data.name}" has been created`);
            history.push("/admin/products");
        })
        .catch(err => {
            toast.error(err.response.data.err);
        });
    };
    const handleChange = (event) => {
        setProductInfo({...productInfo, [event.target.name]: event.target.value});
    };

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
        <div className="bg-gray-300 flex">
            <AdminSideNav></AdminSideNav>
            <div style={{height: "93.445vh"}} className="bg-gray-300 w-full overflow-auto">
                    <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-4 mb-4 max-w-2xl">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            {JSON.stringify(productInfo)}
                            {loading ? (
                                loadingProductForm()
                            ) : (
                                <CreateProductForm
                                    handleSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    productInfo={productInfo}
                                />
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
};

export default CreateProduct;