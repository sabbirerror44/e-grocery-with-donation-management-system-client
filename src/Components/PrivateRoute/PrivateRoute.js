import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { AdminContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    // eslint-disable-next-line no-unused-vars
    const [loggedInAdmin, setLoggedInAdmin] = useContext(AdminContext);
    return (
        <Route
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...rest}
            render={({ location }) =>
                loggedInAdmin ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
