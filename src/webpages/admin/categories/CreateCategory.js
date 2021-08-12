import React from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';

const CreateCategory = () => {
    return (
        <div style={{height: "94.1vh"}} class="bg-gray-300 flex">
            <AdminSideNav></AdminSideNav>
            <div style={{height: "94.1vh"}} className="bg-gray-300 w-full">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-2 mb-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <form>
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            placeholder="new category"
                        />
                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-400 focus:outline-none my-1"
                        >Create Category</button>
                    </form>
                    </div>
                </div>
                <div className="w-full mx-auto flex-1 flex items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full flex gap-4">
                        <div className="p-2 rounded-full hover:bg-gray-200 bg-gray-100 border-2">
                            <p className="text-md font-semibold">Category</p>
                        </div>
                        <div className="p-2 rounded-full hover:bg-gray-200 bg-gray-100 border-2">
                            <p className="text-md font-semibold">Category</p>
                        </div>
                        <div className="p-2 rounded-full hover:bg-gray-200 bg-gray-100 border-2">
                            <p className="text-md font-semibold">Category</p>
                        </div>
                        <div className="p-2 rounded-full hover:bg-gray-200 bg-gray-100 border-2">
                            <p className="text-md font-semibold">Category</p>
                        </div>
                        <div className="p-2 rounded-full hover:bg-gray-200 bg-gray-100 border-2">
                            <p className="text-md font-semibold">Category</p>
                        </div>
                        <div className="p-2 rounded-full hover:bg-gray-200 bg-gray-100 border-2">
                            <p className="text-md font-semibold">Category</p>
                        </div>
                        <div className="p-2 rounded-full hover:bg-gray-200 bg-gray-100 border-2">
                            <p className="text-md font-semibold">Category</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreateCategory;