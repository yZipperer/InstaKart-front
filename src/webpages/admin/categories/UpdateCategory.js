import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {updateCategory, individualCategory} from '../../../apiFunctions/category';

const UpdateCategory = ({history, match}) => {
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(false);

    let rState = useSelector((rState) => {
        return rState;
    });

    useEffect(() => {
        loadIndividualCategory();
    }, []);

    const loadIndividualCategory = () => {
        individualCategory(match.params.slug)
        .then(category => {
            setCategoryName(category.data.name);
        })
        .catch(err => {
            console.log(err);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        updateCategory({name: categoryName}, rState.user.token, match.params.slug)
        .then(res => {
            setLoading(false);
            setCategoryName("");
            toast.success(`Category "${res.data.name}" has been updated`);
            history.push(`/admin/categories`)
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            if(err.response.status === 400) toast.error(err.response.data);
        })
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
            >Update Category</button>
        </form>
    );

    const loadingCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                className="block border border-blue-400 w-full p-3 rounded mb-4  animate-pulse"
                placeholder="category name"
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
        <div className="bg-gray-300 flex">
            <AdminSideNav></AdminSideNav>
            <div style={{height: "93.445vh"}} className="bg-gray-300 w-full overflow-auto">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-4 mb-4">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        {loading ? (
                            loadingCategoryForm()
                        ) : (
                            categoryForm()
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategory;