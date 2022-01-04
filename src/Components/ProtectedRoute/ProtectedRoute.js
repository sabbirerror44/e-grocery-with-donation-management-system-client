import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle

const ProtectedRoute = ({ children, ...rest }) => {
    // eslint-disable-next-line no-unused-vars
    return (
        <Route
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
            render={({ location }) =>
            localStorage.getItem('token') ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/userlogin',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default ProtectedRoute;
