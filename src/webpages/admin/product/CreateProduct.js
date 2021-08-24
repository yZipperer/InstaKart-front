import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {createProduct} from '../../../apiFunctions/product';

const productState = {
    name: "",
    description: "",
    images: [],
    price: "",
    pricePerUnit: "",
    quantity: "",
    suggestedQuanitity: "",
    categories: [],
    category: "",
    subCategories: [],
    brands: [],
    subsidiaryBrands: [],
    brand: "",
    subsidiaryBrand: "",
    shipping: "",
    dimensions: "",
    weight: "",
    origin: "",
    active: true,
    taxable: true
}

const CreateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [productInfo, setProductInfo] = useState(productState);

    const handleSubmit = (event) => {
        event.preventDefault();
    };
    const handleChange = (event) => {
        console.log("sheeeeesh")
    };

    const productForm = () => (
        <form>
            <label className="font-semibold text-xl">Name</label>
            <input 
                type="text"
                name="name"
                className="block border border-grey-light w-full p-3 mt-2 rounded mb-4"
                placeholder="Product Title/Name"
                onChange={handleChange}
                value={productInfo.name}
                autoFocus
                required
            />
            <label className="font-semibold text-xl">Description</label>
            <input 
                type="text"
                name="description"
                className="block border border-grey-light w-full p-3 mt-2 rounded mb-4"
                placeholder="Product Description"
                onChange={handleChange}
                value={productInfo.description}
                required
            />
            <label className="font-semibold text-xl">Price</label>
            <div className="flex mt-2">
                <span className="h-14 w-14 text-center pt-2 hidden sm:inline-block">
                    <i class="fas fa-dollar-sign text-xl align-middle text-gray-700"></i>
                </span>
                <input 
                    type="number"
                    name="price"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Product Price"
                    onChange={handleChange}
                    value={productInfo.price}
                    required
                />
                <span className="h-14 w-14 text-center pt-2 hidden sm:inline-block">
                    <i class="fas fa-dollar-sign text-xl align-middle text-gray-700"></i>
                </span>
                <input 
                    type="number"
                    name="pricePerUnit"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Price Per Unit"
                    onChange={handleChange}
                    value={productInfo.pricePerUnit}
                    required
                />
            </div>
            <label className="font-semibold text-xl">Quantity</label>
            <div className="flex mt-2">
                <input 
                    type="number"
                    name="quantity"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Quantity in Stock"
                    onChange={handleChange}
                    value={productInfo.quantity}
                    required
                />
                <input 
                    type="number"
                    name="suggestedQuantity"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Suggested Quantity in Stock"
                    onChange={handleChange}
                    value={productInfo.suggestedQuanitity}
                    required
                />
            </div>
            <label className="font-semibold text-xl">Shipping</label>
            <div className="flex mt-2 flex-wrap">
                <label className="text-lg">Offer Shipping</label>
                    <select 
                        name="shipping"
                        className="block border border-grey-light w-full p-3 rounded mb-4 mt-1"
                        onChange={handleChange}
                        required
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    <p className="text-red-700">If 'No' selected, local pickup will be the only option for delivery</p>
            </div>
            <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-400 focus:outline-none my-2"
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
                    <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-4 mb-4 max-w-2xl">
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
    )
};

export default CreateProduct;