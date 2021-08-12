import axios from 'axios';

export const listCategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
};

export const readCategory = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/category/${slug}`);
};

export const removeCategory = async (slug, authenticationtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API_URL}/category/${slug}`, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const updateCategory = async (slug, authenticationtoken, category) => {
    return await axios.put(`${process.env.REACT_APP_API_URL}/category/${slug}`, category, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const createCategory = async (authenticationtoken, category) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/category`, category, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};