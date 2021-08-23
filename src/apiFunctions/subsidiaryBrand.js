import axios from 'axios';

export const listSubsidiaryBrands = async (filter) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/subsidiaryBrands`, filter);
};

export const individualSubsidiaryBrand = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/subsidiaryBrand/${slug}`);
};

export const removeSubsidiaryBrand = async (slug, authenticationtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API_URL}/subsidiaryBrand/${slug}`, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const updateSubsidiaryBrand = async (SubsidiaryBrand, authenticationtoken, slug) => {
    return await axios.put(`${process.env.REACT_APP_API_URL}/subsidiaryBrand/${slug}`, SubsidiaryBrand, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const createSubsidiaryBrand = async (SubsidiaryBrand, authenticationtoken) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/subsidiaryBrand`, SubsidiaryBrand, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};