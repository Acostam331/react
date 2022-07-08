import { useUserContext } from '../../Context/UserContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ role = 'user', children }) => {
  const { token } = useUserContext();

  if (!token) return <Navigate replace to="/login" />;
  // if(!user || user.role !== role) return <Navigate replace to="/*"/>;

  return children;
};

export default PrivateRoute;
