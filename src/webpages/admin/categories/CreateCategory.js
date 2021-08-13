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

    let rState = useSelector((rState) => {
        return rState;
    });

    useEffect(() => {
        getCategories();
    }, []);
    
    const getCategories = () => {
        listCategories()
        .then(category => setCategories(category.data));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        createCategory({name: categoryName}, rState.user.token)
        .then(res => {
            setLoading(false);
            setCategoryName("");
            toast.success(`Category "${res.data.name}" has been created`)
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
                toast.success(`${res.data.name} has been deleted`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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

    const loadingCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                className="block border border-blue-400 w-full p-3 rounded mb-4  animate-pulse"
                placeholder="new category"
                onChange={event => setCategoryName(event.target.value)}
                value={"loading..."}
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
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-4 mb-4">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        {loading ? (
                            loadingCategoryForm()
                        ) : (
                            categoryForm()
                        )}
                    </div>
                </div>

                <div className="w-full mx-auto flex-1 flex items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full flex gap-4">
                        {categories.map((category) => (
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