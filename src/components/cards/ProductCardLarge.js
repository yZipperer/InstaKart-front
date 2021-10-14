import React from 'react';
    
const ProductCardLarge = ({product}) => {
    const handleTabChange = (target) => {
        document.getElementById("desc").hidden = true;
        document.getElementById("descB").classList = "inline-block py-6 px-10 text-gray-500 font-bold font-heading";
        document.getElementById("revi").hidden = true;
        document.getElementById("reviB").classList = "inline-block py-6 px-10 text-gray-500 font-bold font-heading";
        document.getElementById("nutr").hidden = true;
        document.getElementById("nutrB").classList = "inline-block py-6 px-10 text-gray-500 font-bold font-heading";
        document.getElementById("ingr").hidden = true;
        document.getElementById("ingrB").classList = "inline-block py-6 px-10 text-gray-500 font-bold font-heading";

        const tab = document.getElementById(target);
        const tabB = document.getElementById(target+"B");
        tabB.classList = "inline-block py-6 px-10 bg-white text-gray-500 font-bold font-heading shadow-2xl";
        tab.hidden = !tab.hidden;
    }

    return (
        <section className="pt-24 pb-16 bg-white w-3/4 mx-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4 mb-24">
                    <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
                        <div className="relative mb-10" style={{height: "564px"}}>
                            <button className="absolute top-1/2 left-0 ml-8 transform translate-1/2 hover:text-indigo-700">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <img className="object-cover w-full h-full" src={product.mainImage[0].url} alt="Main Product Image" />
                            <button className="absolute top-1/2 right-0 mr-8 transform translate-1/2 hover:text-indigo-700">
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        <div className="flex flex-wrap mx-2">
                            {product.images.map((image) => {
                                return (
                                    <div className="w-1/2 sm:w-1/4 p-2">
                                        <a className="block" href="#">
                                        <img className="w-full h-32 object-cover" src={image.url} alt="" />
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <div className="lg:pl-20">
                        <div class="mb-10 pb-10 border-b">
                            <span className="text-gray-500">{product.brand.name}</span>
                            <h2 className="mt-2 mb-6 max-w-xl text-4xl md:text-4xl font-bold font-heading">{product.name}</h2>
                            <div className="mb-8 text-yellow-300">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                            </div>
                            <p className="inline-block mb-8 text-2xl font-bold font-heading text-blue-500">
                            <span>${product.price}</span>
                            </p>
                            <p className="max-w-md text-gray-500">{product.description}</p>
                        </div>
                        <div className="flex mb-12">
                            <div className="">
                                <span className="block mb-4 font-bold font-heading text-gray-400 uppercase">quantity</span>
                                <select className="pl-6 pr-6 py-4 font-semibold font-heading text-gray-500 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-4 mb-14 items-center">
                            <div className="w-full xl:w-2/3 px-2 mb-4 xl:mb-0"><a className="block bg-blue-500 hover:bg-blue-700 text-center text-white font-bold font-heading py-5 px-8 rounded-md uppercase transition duration-200" href="#">Add to cart</a></div>
                            <div className="w-full xl:w-1/3 px-2">
                            <a className="ml-auto sm:ml-0 flex-shrink-0 inline-flex mr-4 items-center justify-center w-16 h-16 rounded-md border hover:border-red-500 hover:text-red-500" href="#">
                                <i className="far fa-heart"></i>
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div>
                    <ul className="flex flex-wrap mb-16 border-b-2">
                        <li className="w-1/2 md:w-auto cursor-pointer"><a onClick={() => handleTabChange("desc")} className="inline-block py-6 px-10 bg-white text-gray-500 font-bold font-heading shadow-2xl" id="descB">Description</a></li>
                        <li className="w-1/2 md:w-auto cursor-pointer"><a onClick={() => handleTabChange("revi")} className="inline-block py-6 px-10 text-gray-500 font-bold font-heading" id="reviB">Reviews</a></li>
                        <li className="w-1/2 md:w-auto cursor-pointer"><a onClick={() => handleTabChange("nutr")} className="inline-block py-6 px-10 text-gray-500 font-bold font-heading" id="nutrB">Nutrition</a></li>
                        <li className="w-1/2 md:w-auto cursor-pointer"><a onClick={() => handleTabChange("ingr")} className="inline-block py-6 px-10 text-gray-500 font-bold font-heading" id="ingrB">Ingredients</a></li>
                    </ul>
                    <div id="desc">
                        <h3 className="mb-8 text-3xl font-bold font-heading text-blue-500">Description</h3>
                        <p className="max-w-2xl text-gray-500">{product.description}</p>
                    </div>
                    <div id="revi" hidden>
                        <h3 className="mb-8 text-3xl font-bold font-heading text-blue-500">Reviews</h3>
                        <p className="max-w-2xl text-gray-500">Reviews will go here</p>
                    </div>
                    <div id="nutr" hidden>
                        <h3 className="mb-8 text-3xl font-bold font-heading text-blue-500">Nutrition Facts</h3>
                        <p className="max-w-2xl text-gray-500">nutrition will go here</p>
                    </div>
                    <div id="ingr" hidden>
                        <h3 className="mb-8 text-3xl font-bold font-heading text-blue-500">Ingredients</h3>
                        <p className="max-w-2xl text-gray-500">{product.ingredients}</p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default ProductCardLarge;