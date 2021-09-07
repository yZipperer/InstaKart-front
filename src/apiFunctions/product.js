import axios from 'axios';

export const createProduct = async (product, authenticationtoken) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/product`, product, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const listProducts = async (amount) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/products/${amount}`)
};