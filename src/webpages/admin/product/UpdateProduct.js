import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import {individualProductUpdate, updateProduct} from '../../../apiFunctions/product';
import {listCategories, individualCategorySubCategories} from '../../../apiFunctions/category';
import {listBrands, individualBrandSubsidiaryBrand} from '../../../apiFunctions/brand';
import UpdateProductForm from '../../../components/forms/UpdateProductForm';

//hours wasted: 4.5

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

const UpdateProduct = ({match, history}) => {
    const [productInfo, setProductInfo] = useState(productState);
    const [loading, setLoading] = useState(false);
    const [showSubCategorySelect, setShowSubCategorySelect] = useState(true);
    const [showSubsidiaryBrandSelect, setShowSubsidiaryBrandSelect] = useState(true);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [subsidiaryBrands, setSubsidiaryBrands] = useState([]);
    const [newImageData, setNewImageData] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    const rState = useSelector((state) => ({...state}));

    useEffect(() => {
        getCategories();
        getBrands();
        getProduct();
    }, []);

    const getCategories = () => {
        listCategories({filter: "alphabet"})
        .then(category => setCategories(category.data));
    };

    const getBrands = () => {
        listBrands({filter: "alphabet"})
        .then(brand => setBrands(brand.data));
    };

    const getProduct = () => {
        individualProductUpdate(match.params.slug, rState.user.token)
        .then(product => {
            setProductInfo({...productInfo, ...product.data});
            getSubCategories(product.data.category);
            getSubsidiaryBrands(product.data.brand);
            displayImages(product.data.images);
        });
    };

    const getSubCategories = (category) => {
        individualCategorySubCategories(category._id)
        .then(res => {
            setSubCategories(res.data);
            setShowSubCategorySelect(true);
        });
    };

    const getSubsidiaryBrands = (brand) => {
        individualBrandSubsidiaryBrand(brand._id)
        .then(res => {
            setSubsidiaryBrands(res.data);
            setShowSubsidiaryBrandSelect(true);
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        await handleImageUpload();

        await updateProduct(productInfo.slug, productInfo, rState.user.token)
        .then(res => {
            setLoading(false);
            toast.success(`Product "${res.data.name}" has been updated`);
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

    const handleCategorySelect = (event) => {
        event.preventDefault();
        setProductInfo({ ...productInfo, category: event.target.value, subCategories: []});
        individualCategorySubCategories(event.target.value)
        .then(res => {
            setSubCategories(res.data);
            setShowSubCategorySelect(true);
        });
    };

    const handleBrandSelect = (event) => {
        event.preventDefault();
        setProductInfo({ ...productInfo, brand: event.target.value, subsidiaryBrands: []});
        individualBrandSubsidiaryBrand(event.target.value)
        .then(res => {
            setSubsidiaryBrands(res.data);
            setShowSubsidiaryBrandSelect(true);
        });
    };

    const handleSubCategoryCheck = (event) => {
        if (event.target.checked){
            setProductInfo({ ...productInfo, subCategories: productInfo.subCategories.concat(event.target.value)});
        } else {
            const filtered = productInfo.subCategories.filter((e) => e !== event.target.value);
            setProductInfo({ ...productInfo, subCategories: filtered});
        }
    };

    const handleSubsidiaryBrandCheck = (event) => {
        if (event.target.checked){
            setProductInfo({ ...productInfo, subsidiaryBrands: productInfo.subsidiaryBrands.concat(event.target.value)});
        } else {
            const filtered = productInfo.subsidiaryBrands.filter((e) => e !== event.target.value);
            setProductInfo({ ...productInfo, subsidiaryBrands: filtered});
        }
    };

    const handleResize = (event) => {
        let files = event.target.files;
        setNewImageData([]);

        if(files) {
            for (let i = 0; i < files.length; i++){
                Resizer.imageFileResizer(files[i], 720, 720, "JPEG", 100, 0, (url) => {
                    let imgData = newImageData;
                    imgData.push(url);
                    setNewImageData(imgData);
                    displayImages(newImageData.concat(productInfo.images));
                }, "base64");
            }
            
        }
    };

    const displayImages = (images) => {
        const imageDisplay = document.getElementById("imageDisplay");

        if (imageDisplay.hasChildNodes()) {
            var child = imageDisplay.lastElementChild; 
            while (child) {
                imageDisplay.removeChild(child);
                child = imageDisplay.lastElementChild;
            }
        }

        for (let i = 0; i < images.length; i++){
            let content = document.createElement("img");
            content.src = images[i].url || images[i];
            content.setAttribute("class", "w-16 h-12");
            imageDisplay.appendChild(content);
        }
    };

    const handleImageUpload = async () => {
        let uploads = productInfo.images;

        if(newImageData.length > 0) {
            for (let i = 0; i < newImageData.length; i++){
                await axios.post(`${process.env.REACT_APP_API_URL}/upload`, {image: newImageData[i]}, {
                    headers: {
                        authenticationtoken: rState.user.token
                    }
                })
                .then(res => {
                    uploads.push(res.data);
                    setProductInfo({...productInfo, images: uploads});
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
        
    };

    const handleImageDelete = (event) => {
        if (window.confirm("Would you like to PERMANENTLY delete this image?")) {
            let url = event.target.src;
            productInfo.images.filter((item) => {
                if(item.url === url){
                    let public_id = item.public_id;

                    setLoading(true);
            
                    axios
                    .post(
                        `${process.env.REACT_APP_API_URL}/remove`,
                        { public_id },
                        {
                            headers: {
                                authenticationtoken: rState.user.token
                            }
                        }
                    )
                    .then((res) => {
                        setLoading(false);
                        let filteredImages = productInfo.images.filter((item) => {
                        return item.public_id !== public_id;
                        });
                        setProductInfo({ ...productInfo, images: filteredImages });
                        displayImages(newImageData.concat(filteredImages));
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                    });
                } else {
                    let filteredImages = newImageData.filter((item) => {
                        return item !== url;
                    });
                    setNewImageData(filteredImages);
                    displayImages(newImageData.concat(productInfo.images));
                }
            });
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

                            {loading ? (
                                loadingProductForm()
                            ) : (
                                <UpdateProductForm
                                    handleSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    handleCategorySelect={handleCategorySelect}
                                    handleSubCategoryCheck={handleSubCategoryCheck}
                                    handleBrandSelect={handleBrandSelect}
                                    handleSubsidiaryBrandCheck={handleSubsidiaryBrandCheck}
                                    handleResize={handleResize}
                                    handleImageDelete={handleImageDelete}
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

export default UpdateProduct;