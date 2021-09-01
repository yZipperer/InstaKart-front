import React from 'react';

const CreateProductForm = ({
    handleSubmit,
    handleChange,
    handleCategorySelect,
    handleCheck,
    productInfo,
    categories,
    subCategories,
    brands,
    showSubCategorySelect
}) => {
    return(
    <form onSubmit={handleSubmit}>
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
                    value={productInfo.suggestedQuantity}
                    required
                />
            </div>
            <label className="font-semibold text-xl">Category</label>
            <div className="flex mt-2">
                <select className="block border border-grey-light w-full p-3 rounded mb-4" name="category" onChange={handleCategorySelect}>
                    <option>-- Select Category --</option>
                    {categories.length > 0 && categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
                <select className="block border border-grey-light w-full p-3 rounded mb-4" name="category" onChange={handleCategorySelect}>
                    <option>-- Select Subcategory --</option>
                    {subCategories.length > 0 && subCategories.map((subCategory) => (
                        <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex mt-2">
                {showSubCategorySelect? (subCategories.length > 0 && subCategories.map((subCategory) => (
                    <div key={subCategory._id} className="p-2 rounded-full hover:bg-gray-200 bg-gray-100 border-2 flex">
                        <input 
                            type="checkbox" 
                            onChange={handleCheck} 
                            name="subCategories" 
                            value={subCategory._id}
                        ></input>
                        <p className="text-md font-semibold">
                            {subCategory.name}
                        </p>
                    </div>
                ))) : null}
            </div>
            <label className="font-semibold text-xl">Brand</label>
            <div className="flex mt-2">
                <select className="block border border-grey-light w-full p-3 rounded mb-4" name="brand" onChange={handleChange}>
                    <option>-- Select Brand --</option>
                    {brands.length > 0 && brands.map((brand) => (
                        <option key={brand._id} value={brand._id}>{brand.name}</option>
                    ))}
                </select>
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
                <label className="text-lg w-full mt-2">Origin</label>
                <select 
                    name="origin"
                    className="block border border-grey-light w-full p-3 rounded mb-4 mt-1"
                    onChange={handleChange}
                    required
                >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="United Kingdom">United Kingdom</option>
                </select>
                <label className="text-lg w-full">Dimensions (Inches)</label>
                <div className="flex mt-2">
                    <input 
                        type="number"
                        name="dimensionLength"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        placeholder="Length"
                        onChange={handleChange}
                        value={productInfo.dimensionLength}
                        required
                    />
                    <input 
                        type="number"
                        name="dimensionWidth"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        placeholder="Width"
                        onChange={handleChange}
                        value={productInfo.dimensionWidth}
                        required
                    />
                <input 
                    type="number"
                    name="dimensionHeight"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="Height"
                    onChange={handleChange}
                    value={productInfo.dimensionHeight}
                    required
                />
            </div>
            <label className="text-lg w-full">Weight (Pounds)</label>
            <input 
                type="number"
                name="weight"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="Weight (Pounds)"
                onChange={handleChange}
                value={productInfo.weight}
                required
            />
        </div>
        <label className="font-semibold text-xl">Other</label>
        <div className="flex mt-2 flex-wrap">
            <label className="text-lg">Set Product as Active</label>
            <select 
                name="active"
                className="block border border-grey-light w-full p-3 rounded mb-4 mt-1"
                onChange={handleChange}
                required
            >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
            <p className="text-red-700">If 'No' selected, product will not appear for sale.</p>
            <label className="text-lg w-full">Taxable</label>
            <select 
                name="taxable"
                className="block border border-grey-light w-full p-3 rounded mb-4 mt-1"
                onChange={handleChange}
                required
            >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
        </div>
        <button
            type="submit"
            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-400 focus:outline-none my-2"
        >Create Product</button>
    </form>
    );
};

export default CreateProductForm;