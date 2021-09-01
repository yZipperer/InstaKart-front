import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {createProduct} from '../../../apiFunctions/product';
import {listCategories, individualCategorySubCategories} from '../../../apiFunctions/category';
import {listBrands} from '../../../apiFunctions/brand';
import CreateProductForm from '../../../components/forms/CreateProductForm';

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
    subsidiaryBrands: [],
    brand: "",
    subsidiaryBrand: "",
    shipping: "Yes",
    dimensionLength: null,
    dimensionWidth: null,
    dimensionHeight: null,
    weight: "",
    origin: "United States",
    active: true,
    taxable: true
}

const CreateProduct = ({history}) => {
    const [loading, setLoading] = useState(false);
    const [showSubCategorySelect, setShowSubCategorySelect] = useState(false);
    const [productInfo, setProductInfo] = useState(productState);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const rState = useSelector((state) => ({...state}));

    useEffect(() => {
        getCategories();
        getBrands();
    }, []);
    
    const getCategories = () => {
        listCategories({filter: "alphabet"})
        .then(category => setCategories(category.data));
    };

    const getBrands = async() => {
        listBrands({filter: "alphabet"})
        .then(brand => setBrands(brand.data));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setProductInfo({...productInfo, subCategories: selectedSubCategories});

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

    const handleCategorySelect = (event) => {
        event.preventDefault();
        setProductInfo({ ...productInfo, category: event.target.value});
        individualCategorySubCategories(event.target.value)
        .then(res => {
            console.log(res.data);
            setSubCategories(res.data);
            setShowSubCategorySelect(true);
        });
    };

    const handleCheck = (event) => {
        if (event.target.checked){
            setSelectedSubCategories(selectedSubCategories.concat(event.target.value));
        } else {
            const filtered = selectedSubCategories.filter((e) => e !== event.target.value);
            setSelectedSubCategories(filtered);
        }
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
                            {JSON.stringify(selectedSubCategories)}
                            {loading ? (
                                loadingProductForm()
                            ) : (
                                <CreateProductForm
                                    handleSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    handleCategorySelect={handleCategorySelect}
                                    handleCheck={handleCheck}
                                    categories={categories}
                                    subCategories= {subCategories}
                                    showSubCategorySelect={showSubCategorySelect}
                                    productInfo={productInfo}
                                    brands={brands}
                                />
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
};

export default CreateProduct;