import axios from 'axios';

export const createProduct = async (product, authenticationtoken) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/product`, product, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

//admin only
export const listProducts = async (amount, authenticationtoken) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/allproducts/${amount}`, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

//user and admin
export const listProductsActive = async (target, order, pageNum, resultsPerPage) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/products/${target}/${order}?pageNum=${pageNum}&resPerPage=${resultsPerPage}`);
}

export const deleteProduct = async (slug, authenticationtoken) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/product/${slug}`, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const individualProduct = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/product/${slug}`);
};

export const individualProductUpdate = async (slug, authenticationtoken) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/productupdate/${slug}`, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const updateProduct = async (slug, product, authenticationtoken) => {
    return await axios.put(`${process.env.REACT_APP_API_URL}/product/${slug}`, product, {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const getProductNum = async () => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/products/num`);
}