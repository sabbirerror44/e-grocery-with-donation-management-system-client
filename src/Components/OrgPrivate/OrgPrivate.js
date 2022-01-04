import React from 'react';
import { Redirect, Route } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle

const OrgPrivate = ({ children, ...rest }) => {
    // eslint-disable-next-line no-unused-vars
    return (
        <Route
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
            render={({ location }) =>
            localStorage.getItem('org_token') ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/organizationlogin',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default OrgPrivate;
