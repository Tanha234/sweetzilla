import { Route, Navigate } from 'react-router-dom';
import useUserRole from '../hooks/useUserRole'; 

const UserRoute = ({ children, ...rest }) => {
  const userRole = useUserRole();

  // Debugging: log the user role
  console.log('User role:', userRole);

  if (userRole === null) {
    // Show loading or splash screen if role is not available yet
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      element={
        userRole === 'user' || userRole === 'admin' ? (
          children
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default UserRoute;
