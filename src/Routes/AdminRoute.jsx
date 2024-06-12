import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import PropTypes from 'prop-types';

const AdminRoute = ({ children }) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex justify-center items-center h-full">
            <div className="w-16 h-16 border-4 border-dashed border-green-600 rounded-full animate-spin dark:border-violet-600"></div>
        </div>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate >
};
AdminRoute.propTypes = {
    children: PropTypes.object.isRequired,
}

export default AdminRoute;