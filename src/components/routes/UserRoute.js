import React from 'react';
import {Route, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Loading from './Loading';

const UserRoute = ({inh, ...rest}) => {
    const {user} = useSelector((rState) => ({...rState}));

    return user && user.token ? (
        <Route {...rest} render={() => inh}></Route>
    ) : (
        <Loading />
    )
};

export default UserRoute;