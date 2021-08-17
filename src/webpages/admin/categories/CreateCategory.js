import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {createCategory, listCategories, removeCategory} from '../../../apiFunctions/category';

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [searchKey, setSearchKey] = useState("");

    let rState = useSelector((rState) => {
        return rState;
    });

    useEffect(() => {
        getCategories();
    }, []);
    
    const getCategories = () => {
        listCategories({filter: "created"})
        .then(category => setCategories(category.data));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        createCategory({name: categoryName}, rState.user.token)
        .then(res => {
            setLoading(false);
            setCategoryName("");
            toast.success(`Category "${res.data.name}" has been created`);
            getCategories();
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            if(err.response.status === 400) toast.error(err.response.data);
        })
    };

    const handleDelete = (slug) => {
        if(window.confirm(`Would you like to delete "${slug}"?`)) {
            setLoading(true);
            removeCategory(slug, rState.user.token)
            .then(res => {
                setLoading(false);
                toast.success(`"${res.data.name}" has been deleted`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                getCategories();
            })
            .catch(err => {
                setLoading(false);
                toast.error(`Failed to delete "${slug}, ${err.response.data}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        } else {

        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchKey(event.target.value.toLowerCase());
    };

    const search = (searchKey) => (category) => category.name.toLowerCase().includes(searchKey);

    const categoryForm = () => (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="new category"
                onChange={event => setCategoryName(event.target.value)}
                value={categoryName}
                autoFocus
                required
            />
            <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-400 focus:outline-none my-1"
            >Create Category</button>
        </form>
    );

    const categorySearchForm = () => (
        <form onSubmit={handleSearch}>
            <input 
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                placeholder="search"
                onChange={handleSearch}
                value={searchKey}
                autoFocus
                required
            />
            <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-400 focus:outline-none my-1"
            >Search</button>
        </form>
    );

    const loadingCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                className="block border border-blue-400 w-full p-3 rounded mb-4  animate-pulse"
                placeholder="new category"
                onChange={event => setCategoryName(event.target.value)}
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

    const loadingCategorySearchForm = () => (
        <form onSubmit={handleSearch}>
            <input 
                type="text"
                className="block border border-blue-400 w-full p-3 rounded mb-4  animate-pulse"
                placeholder="search"
                onChange={handleSearch}
                value={"Searching ..."}
                autoFocus
                disabled
                required
            />
            <button
                type="submit"
                className="w-full text-center py-3 rounded text-white focus:outline-none my-1 bg-blue-400 animate-pulse"
                disabled
            >Searching ...</button>
        </form>
    );
    
    return (
        <div style={{height: "94.1vh"}} className="bg-gray-300 flex">
            <AdminSideNav></AdminSideNav>
            <div style={{height: "94.1vh"}} className="bg-gray-300 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
                    <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-4 mb-4 w-full">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            {loading ? (
                                loadingCategorySearchForm()
                            ) : (
                                categorySearchForm()
                            )}
                        </div>
                    </div>

                    <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-4 mb-4 w-full">
                        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                            {loading ? (
                                loadingCategoryForm()
                            ) : (
                                categoryForm()
                            )}
                        </div>
                    </div>

                    <div class="container mx-auto px-2 mt-4 mb-4 w-full hidden sm:inline-block">
                        <div class="relative flex items-center px-5 md:px-4 py-2 overflow-hidden rounded-md shadow-lg bg-white h-full">
                            <span class="absolute top-0 left-0 w-4 h-full bg-blue-500"></span>
                            <div class="px-4 py-4 ml-4 rounded-full bg-purple-500">
                                <i class="fas fa-file text-white w-5 h-5 text-center"></i>
                            </div>
                            <div class="mx-5">
                                <h4 class="text-2xl lg:text-4xl font-semibold text-gray-800">{categories.length}</h4>
                                <div class="text-gray-700 text-xl lg:text-2xl">Categories</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mx-auto flex-1 flex items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full flex flex-wrap gap-4">
                        {categories.filter(search(searchKey)).map((category) => (
                            <div key={category._id} className="p-2 rounded-full hover:bg-gray-200 bg-gray-100 border-2">
                                <p className="text-md font-semibold">
                                    {category.name}
                                    <span className="space-x-2 pl-2">
                                        <Link to={`/admin/category/${category.slug}`}>
                                            <i class="far fa-edit text-blue-700 hover:blue-900"></i>
                                        </Link>
                                        <button onClick={() => handleDelete(category.slug)} className="cursor-pointer">
                                            <i class="far fa-trash-alt text-red-600 hover:red-800"></i>
                                        </button>
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreateCategory;