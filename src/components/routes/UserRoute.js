import React from 'react';
import {Route, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

const UserRoute = ({inh, ...rest}) => {
    const {user} = useSelector((rState) => ({...rState}));

    return user && user.token ? (
        <Route {...rest} render={() => inh}></Route>
    ) : (
        <p className="text-center mt-24">Loading page...</p>
    )
};

export default UserRoute;