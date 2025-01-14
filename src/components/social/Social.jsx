
import { FaGoogle } from 'react-icons/fa6';
import useAuth from '../../Hooks/useAuth';
import userAxiosPublic from '../../Hooks/userAxiosPublic';
import { useNavigate } from 'react-router-dom';

const Social = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = userAxiosPublic();
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(result => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name:result.user?.displayName
      }
      axiosPublic.post('/users', userInfo)
        .then(result => {
          console.log(result.data);
        navigate('/')
      })
    })
  }
  return (
   <button onClick={handleGoogleSignIn} className="btn ">
<FaGoogle></FaGoogle>
  Button
</button>
  );
};

export default Social;