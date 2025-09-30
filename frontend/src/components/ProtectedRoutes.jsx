import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { contextapi } from '../Contextapi';
// import { contextapi } from './Contextapi';

const ProtectedRoute = ({ children }) => {
    const { loginname } = useContext(contextapi);
   

    // Agar login nahi hai to login page pe bheje
    return loginname ? children : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;
