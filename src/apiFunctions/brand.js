import axios from 'axios';

export const listBrands = async (filter) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/brands`, filter);
};

export const individualBrand = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/brand/${slug}`);
};

export const removeBrand = async (slug, authenticationtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API_URL}/brand/${slug}`, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const updateBrand = async (brand, authenticationtoken, slug) => {
    return await axios.put(`${process.env.REACT_APP_API_URL}/brand/${slug}`, brand, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const createBrand = async (brand, authenticationtoken) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/brand`, brand, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const individualBrandSubsidiaryBrand = async (_id) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/brand/subsidiarybrand/${_id}`);
};