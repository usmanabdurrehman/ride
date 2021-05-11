import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'

const PrivateRoute = ({component: Component, ...rest}) => {

	let token = Cookies.get('token')?true:false
	console.log('PrivateRoute',token)

    return (
        <Route {...rest} render={props => (
            token ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;