import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex justify-center items-center h-full">
            <div className="w-16 h-16 border-4 border-dashed border-green-600 rounded-full animate-spin dark:border-violet-600"></div>
        </div>
    }

    if (user) {
        return children;
    }
    // return <Navigate state={location.pathname} to='/login'></Navigate>
    return <Navigate to='/login' state={{ from: location }} replace></Navigate >
};
PrivateRoutes.propTypes = {
    children: PropTypes.object.isRequired,
}

export default PrivateRoutes;