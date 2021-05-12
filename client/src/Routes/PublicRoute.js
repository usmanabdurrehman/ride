import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie'

const PublicRoute = ({component: Component, ...rest}) => {

	let token = Cookies.get('token')?true:false
	console.log('PublicRoute',token)

    return (
        <Route {...rest} render={props => (
            !token ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PublicRoute;