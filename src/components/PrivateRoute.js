import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);

    return (
        // <Outlet
        //     {...rest}
        //     exact
        //     render={(props => user ? <Component {...props} /> : <Navigate to='/login' replace={true} />)}
        // />
        user ? <Outlet /> : <Navigate to='/login' replace={true} />
    )
};

export default PrivateRoute;