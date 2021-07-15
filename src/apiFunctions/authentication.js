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