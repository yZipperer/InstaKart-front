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
    mainImage: [],
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
    shelfLife: null,
    weight: "",
    origin: "United States",
    temperature: "Average",
    active: true,
    taxable: true,
    seasonal: "All",
    ingredients: "",
    nutrition: {
        servingsPerContainer: null,
        servingSize: "",
        caloriesPerServing: null,
        totalFatPerServing: null,
        cholestrolPerServing: null,
        sodiumPerServing: null,
        totalCarbohydratesPerServing: null,
        dietaryFiberPerServing: null,
        totalSugarsPerServing: null,
        proteinPerServing: null,
    }
}

const CreateProduct = ({history}) => {
    const [loading, setLoading] = useState(false);
    const [showSubCategorySelect, setShowSubCategorySelect] = useState(false);
    const [showSubsidiaryBrandSelect, setShowSubsidiaryBrandSelect] = useState(false);
    const [productInfo, setProductInfo] = useState(productState);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [subsidiaryBrands, setSubsidiaryBrands] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [mainImageData, setMainImageData] = useState("");

    const rState = useSelector((state) => ({...state}));

    useEffect(() => {
        getCategories();
        getBrands();
        setProductInfo({...productInfo, images: [], mainImage: []})
    }, []);
    
    const getCategories = () => {
        listCategories({filter: "alphabet"})
        .then(category => setCategories(category.data));
    };

    const getBrands = () => {
        listBrands({filter: "alphabet"})
        .then(brand => setBrands(brand.data));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        await handleImageUpload();

        await createProduct(productInfo, rState.user.token)
        .then(res => {
            setLoading(false);
            toast.success(`Product "${res.data.name}" has been created`);
            history.push("/admin/products");
        })
        .catch(err => {
            setLoading(false);
            toast.error(err.response.data.err);
        });
    };

    const handleChange = (event) => {
        setProductInfo({...productInfo, [event.target.name]: event.target.value});
    };

    const handleNutritionChange = (event) => {
        let tempProductInfo = productInfo;
        let name = event.target.name;
        tempProductInfo.nutrition[name] = event.target.value

        setProductInfo(tempProductInfo);
    };

    const handleCategorySelect = (event) => {
        event.preventDefault();
        setProductInfo({ ...productInfo, category: event.target.value});
        individualCategorySubCategories(event.target.value)
        .then(res => {
            setSubCategories(res.data);
            setShowSubCategorySelect(true);
        });
    };

    const handleBrandSelect = (event) => {
        event.preventDefault();
        setProductInfo({ ...productInfo, brand: event.target.value});
        individualBrandSubsidiaryBrand(event.target.value)
        .then(res => {
            setSubsidiaryBrands(res.data);
            setShowSubsidiaryBrandSelect(true);
        });
    };

    const handleSubCategoryCheck = (event) => {
        if (event.target.checked){
            productInfo.subCategories = productInfo.subCategories.concat(event.target.value);
        } else {
            const filtered = productInfo.subCategories.filter((e) => e !== event.target.value);
            productInfo.subCategories = filtered;
        }
    };

    const handleSubsidiaryBrandCheck = (event) => {
        if (event.target.checked){
            productInfo.subsidiaryBrands = productInfo.subsidiaryBrands.concat(event.target.value);
        } else {
            const filtered = productInfo.subsidiaryBrands.filter((e) => e !== event.target.value);
            productInfo.subsidiaryBrands = filtered;
        }
    };

    const handleResize = (event) => {
        let files = event.target.files;
        setImageData([]);

        if(files) {
            for (let i = 0; i < files.length; i++){
                Resizer.imageFileResizer(files[i], 720, 720, "JPEG", 100, 0, (url) => {
                    let imgData = imageData;
                    imgData.push(url);
                    setImageData(imgData);
                    displayImages();
                }, "base64");
            }
            
        }
    };

    const handleMainResize = (event) => {
        let files = event.target.files;

        if(files) {
            for (let i = 0; i < files.length; i++){
                Resizer.imageFileResizer(files[i], 720, 720, "JPEG", 100, 0, (url) => {
                    setMainImageData(url);
                }, "base64");
            }
            
        }
    };

    const displayImages = () => {
        const imageDisplay = document.getElementById("imageDisplay");

        if (imageDisplay.hasChildNodes()) {
            var child = imageDisplay.lastElementChild; 
            while (child) {
                imageDisplay.removeChild(child);
                child = imageDisplay.lastElementChild;
            }
        }

        for (let i = 0; i < imageData.length; i++){
            let content = document.createElement("img");
            content.src = imageData[i];
            content.setAttribute("class", "w-16 h-12");
            imageDisplay.appendChild(content);
        }
    };

    const handleImageUpload = async () => {
        let uploads = productInfo.images;
        let mainImageInfo = productInfo.mainImage;

        if(imageData.length > 0) {
            for (let i = 0; i < imageData.length; i++){
                await axios.post(`${process.env.REACT_APP_API_URL}/upload`, {image: imageData[i]}, {
                    headers: {
                        authenticationtoken: rState.user.token
                    }
                })
                .then(res => {
                    uploads.push(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }

        if(mainImageData) {
            await axios.post(`${process.env.REACT_APP_API_URL}/upload`, {image: mainImageData}, {
                headers: {
                    authenticationtoken: rState.user.token
                }
            })
            .then(res => {
                mainImageInfo.push(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }

        setProductInfo({...productInfo, images: uploads, mainImage: mainImageInfo});
        console.log("mi", productInfo.mainImage);
        
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
                            {loading ? (
                                loadingProductForm()
                            ) : (
                                <CreateProductForm
                                    handleSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    handleNutritionChange={handleNutritionChange}
                                    handleCategorySelect={handleCategorySelect}
                                    handleSubCategoryCheck={handleSubCategoryCheck}
                                    handleBrandSelect={handleBrandSelect}
                                    handleSubsidiaryBrandCheck={handleSubsidiaryBrandCheck}
                                    handleResize={handleResize}
                                    handleMainResize={handleMainResize}
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