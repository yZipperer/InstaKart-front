import axios from 'axios';

export const cUser = async (authenticationtoken) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/cUser`, 
        {}, 
        {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const currentUser = async (authenticationtoken) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/currentUser`, 
        {}, 
        {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};

export const currentAdmin = async (authenticationtoken) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/currentAdmin`, 
        {}, 
        {
        headers: {
            authenticationtoken: authenticationtoken
        }
    });
};