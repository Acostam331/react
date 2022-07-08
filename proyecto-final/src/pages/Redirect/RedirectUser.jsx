import { useUserContext } from '../../Context/UserContext';
import { Navigate } from 'react-router-dom';
/*import sad from '../../assets/img/error.jpg'*/

/* !!Login always redict to Feed, but the Feed will rederize depending on the role!! */
const rolePages = {
  admin: '/admin',
  user: '/feed',
};

const RedirectUser = () => {
  const { user } = useUserContext();

  if (!user)
    return (
      
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-white">
        <p className="text-lg font-medium text-gray-800 text-center p-8">
          {' '}
          Redireccionando... No se puede redireccionar{' '}
        </p>
        {/* <div className="w-1/2 lg:w-1/2 flex justify-center items-center">
      <img className="w-1/2" src={sad} />
    </div> */}
      </div>
    );

  return <Navigate replace to={rolePages.user ?? '/'} />;
};

export default RedirectUser;
