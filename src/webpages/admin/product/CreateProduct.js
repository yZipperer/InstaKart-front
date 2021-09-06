import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import {createProduct} from '../../../apiFunctions/product';
import {listCategories, individualCategorySubCategories} from '../../../apiFunctions/category';
import {listBrands, individualBrandSubsidiaryBrand} from '../../../apiFunctions/brand';
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
    brand: "",
    subsidiaryBrands: [],
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
    const [showSubsidiaryBrandSelect, setShowSubsidiaryBrandSelect] = useState(false);
    const [productInfo, setProductInfo] = useState(productState);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [subsidiaryBrands, setSubsidiaryBrands] = useState([]);
    const [selectedSubsidiaryBrands, setSelectedSubsidiaryBrands] = useState([]);
    const [imageData, setImageData] = useState([]);

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
        setProductInfo({...productInfo, subsidiaryBrands: selectedSubsidiaryBrands});
        handleImageUpload();

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

    const handleBrandSelect = (event) => {
        event.preventDefault();
        setProductInfo({ ...productInfo, brand: event.target.value});
        individualBrandSubsidiaryBrand(event.target.value)
        .then(res => {
            console.log(res.data);
            setSubsidiaryBrands(res.data);
            setShowSubsidiaryBrandSelect(true);
        });
    };

    const handleSubCategoryCheck = (event) => {
        if (event.target.checked){
            setSelectedSubCategories(selectedSubCategories.concat(event.target.value));
        } else {
            const filtered = selectedSubCategories.filter((e) => e !== event.target.value);
            setSelectedSubCategories(filtered);
        }
    };

    const handleSubsidiaryBrandCheck = (event) => {
        if (event.target.checked){
            setSelectedSubsidiaryBrands(selectedSubsidiaryBrands.concat(event.target.value));
        } else {
            const filtered = selectedSubsidiaryBrands.filter((e) => e !== event.target.value);
            setSelectedSubsidiaryBrands(filtered);
        }
    };

    const handleResize = (event) => {
        let files = event.target.files;

        if(files) {
            for (let i = 0; i < files.length; i++){
                Resizer.imageFileResizer(files[i], 720, 720, "JPEG", 100, 0, (url) => {
                    imageData.push(url);
                }, "base64");
            }
        }
    };

    const handleImageUpload = () => {
        let uploads = productInfo.images;

        if(imageData) {
            setLoading(true);
            for (let i = 0; i < imageData.length; i++){
                axios.post(`${process.env.REACT_APP_API_URL}/upload`, {image: imageData[i]}, {
                    headers: {
                        authenticationtoken: rState.user.token
                    }
                })
                .then(res => {
                    console.log("Image Upload Response", res);
                    setLoading(false);
                    uploads.push(res.data);
                    setProductInfo({...productInfo, images: uploads});
                })
                .catch(err => {
                    setLoading(false);
                    console.log(err);
                });
            }
        }
        
    };

    const loadingProductForm = () => (
        <form>
            <input 
                type="text"
                className="block border border-blue-400 w-full p-3 rounded mb-4  animate-pulse"
                placeholder="new product"
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
                            {JSON.stringify(productInfo.images)}
                            {loading ? (
                                loadingProductForm()
                            ) : (
                                <CreateProductForm
                                    handleSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    handleCategorySelect={handleCategorySelect}
                                    handleSubCategoryCheck={handleSubCategoryCheck}
                                    handleBrandSelect={handleBrandSelect}
                                    handleSubsidiaryBrandCheck={handleSubsidiaryBrandCheck}
                                    handleResize={handleResize}
                                    setLoading={setLoading}
                                    categories={categories}
                                    subCategories= {subCategories}
                                    showSubCategorySelect={showSubCategorySelect}
                                    productInfo={productInfo}
                                    brands={brands}
                                    subsidiaryBrands={subsidiaryBrands}
                                    showSubsidiaryBrandSelect={showSubsidiaryBrandSelect}
                                />
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
};

export default CreateProduct;