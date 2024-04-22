import React from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Navigate, Route } from 'react-router'

const ProtectedRoute = ({ element, ...rest }) => {
    const { isAuthenticated } = useAuthUser();

    return (
        <Route
            {...rest}
            element={isAuthenticated() ? element : <Navigate to="/login" replace />}
        />
    );
};

export default ProtectedRoute