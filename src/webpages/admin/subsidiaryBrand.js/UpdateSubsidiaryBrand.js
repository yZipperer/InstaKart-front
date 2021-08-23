import React, {useState, useEffect} from 'react';
import AdminSideNav from '../../../components/menu/AdminSideNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {updateSubsidiaryBrand, individualSubsidiaryBrand} from '../../../apiFunctions/subsidiaryBrand';
import {listBrands} from '../../../apiFunctions/brand';

const UpdateSubsidiaryBrand = ({history, match}) => {
    const [subsidiaryBrandName, setSubsidiaryBrandName] = useState("");
    const [parentId, setParentId] = useState("");
    const [parentName, setParentName] = useState("");
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);

    let rState = useSelector((rState) => {
        return rState;
    });

    useEffect(() => {
        getBrands();
        loadIndividualSubsidiaryBrand();
    }, []);

    const loadIndividualSubsidiaryBrand = () => {
        individualSubsidiaryBrand(match.params.slug)
        .then(subsidiaryBrand => {
            setSubsidiaryBrandName(subsidiaryBrand.data.name);
            setParentId(subsidiaryBrand.data.parent);
        })
        .catch(err => {
            console.log(err);
        });
    };
    
    const getBrands = () => {
        listBrands({filter: "alphabet"})
        .then(brand => {
            setBrands(brand.data);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        console.log(subsidiaryBrandName, parentId, rState.user.token, match.params.slug);
        updateSubsidiaryBrand({name: subsidiaryBrandName, parent: parentId}, rState.user.token, match.params.slug)
        .then(res => {
            setLoading(false);
            setSubsidiaryBrandName("");
            toast.success(`Subsidiary Brand "${res.data.name}" has been updated`);
            history.push(`/admin/subsidiaryBrands`)
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            if(err.response.status === 400) toast.error(err.response.data);
        })
    };

    const subsidiaryBrandForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="flex">
                <select className="block border border-grey-light w-full p-3 rounded mb-4" onChange={event => setParentId(event.target.value)}>
                    {brands.length > 0 && brands.map((brand) => (
                        <option key={brand._id} value={brand._id} selected={brand._id === parentId}>{brand.name}</option>
                    ))}
                </select>
                <input 
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    placeholder="subsidiary brand name"
                    onChange={event => setSubsidiaryBrandName(event.target.value)}
                    value={subsidiaryBrandName}
                    autoFocus
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-400 focus:outline-none my-1"
            >Update Subsidiary Brand</button>
        </form>
    );

    const loadingSubsidiaryBrandForm = () => (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                className="block border border-blue-400 w-full p-3 rounded mb-4  animate-pulse"
                placeholder="new subsidiary brand"
                onChange={event => setSubsidiaryBrandName(event.target.value)}
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
                            loadingSubsidiaryBrandForm()
                        ) : (
                            subsidiaryBrandForm()
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateSubsidiaryBrand;