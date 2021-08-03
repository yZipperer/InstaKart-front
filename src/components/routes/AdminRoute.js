import React, {useEffect, useState} from 'react';
import {Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Loading from './Loading';
import {currentAdmin} from '../../apiFunctions/authentication';

const AdminRoute = ({inh, ...rest}) => {
    const {user} = useSelector((rState) => ({...rState}));
    const [proc, setProc] = useState(false);

    useEffect(() => {
        if(user && user.token){
            currentAdmin(user.token)
            .then((res) => {
                console.log(res);
                setProc(true);
            })
            .catch((err) => {
                console.log(err);
                setProc(false);
            })
        }
    }, [user]);

    return proc ? (
        <Route {...rest}></Route>
    ) : (
        <Loading />
    )
};

export default AdminRoute;