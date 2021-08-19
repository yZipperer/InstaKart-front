import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {updateSubCategory, individualSubCategory} from '../../../apiFunctions/subCategory';
import {listCategories} from '../../../apiFunctions/category';

const UpdateSubCategory = ({history, match}) => {
    const [subCategoryName, setSubCategoryName] = useState("");
    const [parentId, setParentId] = useState("");
    const [parentName, setParentName] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    let rState = useSelector((rState) => {
        return rState;
    });

    useEffect(() => {
        getCategories();
        loadIndividualSubCategory();
    }, []);

    const loadIndividualSubCategory = () => {
        individualSubCategory(match.params.slug)
        .then(subCategory => {
            setSubCategoryName(subCategory.data.name);
            setParentId(subCategory.data.parent);
        })
        .catch(err => {
            console.log(err);
        });
    };
    
    const getCategories = () => {
        listCategories({filter: "alphabet"})
        .then(category => {
            setCategories(category.data);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        console.log(subCategoryName, parentId, rState.user.token, match.params.slug);
        updateSubCategory({name: subCategoryName, parent: parentId}, rState.user.token, match.params.slug)
        .then(res => {
            setLoading(false);
            setSubCategoryName("");
            toast.success(`Subcategory "${res.data.name}" has been updated`);
            history.push(`/admin/subcategories`)
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            if(err.response.status === 400) toast.error(err.response.data);
        })
    };

    const subCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="flex">
                <select className="block border border-grey-light w-full p-3 rounded mb-4" onChange={event => setParentId(event.target.value)}>
                    {categories.length > 0 && categories.map((category) => (
                        <option key={category._id} value={category._id} selected={category._id === parentId}>{category.name}</option>
                    ))}
                </select>
                <input 
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="subcategory name"
                    onChange={event => setSubCategoryName(event.target.value)}
                    value={subCategoryName}
                    autoFocus
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-400 focus:outline-none my-1"
            >Update Category</button>
        </form>
    );

    const loadingSubCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                className="block border border-blue-400 w-full p-3 rounded mb-4  animate-pulse"
                placeholder="new category"
                onChange={event => setSubCategoryName(event.target.value)}
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
                            loadingSubCategoryForm()
                        ) : (
                            subCategoryForm()
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateSubCategory;