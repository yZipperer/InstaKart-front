import axios from 'axios';

export const listCategories = async (filter) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/categories`, filter);
};

export const individualCategory = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/category/${slug}`);
};

export const removeCategory = async (slug, authenticationtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API_URL}/category/${slug}`, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const updateCategory = async (category, authenticationtoken, slug) => {
    return await axios.put(`${process.env.REACT_APP_API_URL}/category/${slug}`, category, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const createCategory = async (category, authenticationtoken) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/category`, category, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const individualCategorySubCategories = async (_id) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/category/subcategories/${_id}`);
};