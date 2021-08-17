import axios from 'axios';

export const listSubCategories = async (filter) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/subCategories`, filter);
};

export const individualSubCategory = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/subCategory/${slug}`);
};

export const removeSubCategory = async (slug, authenticationtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API_URL}/subCategory/${slug}`, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const updateSubCategory = async (subCategory, authenticationtoken, slug) => {
    return await axios.put(`${process.env.REACT_APP_API_URL}/subCategory/${slug}`, subCategory, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const createSubCategory = async (subCategory, authenticationtoken) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/subCategory`, subCategory, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};