import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosInstance = axios.create({
  baseURL:'http://localhost:5000'
})

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const {handleSignOut}=useAuth()
  axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token');
    config.headers.authorization=`Bearer ${token}`
    return config;
  }, function (error) {
    return Promise.reject(error)
  })

  
  axiosInstance.interceptors.response.use(function (response) {
    return response;
  }, async(error)=> {
    const status = error.response.status;

    //TODO: set 403 status
    if (status === 401  ) {
      await handleSignOut()
      navigate('/login')
    }
    // console.log('status error in the interceptor', status);
    return Promise.reject(error)
  })
  
  return axiosInstance;
};

export default useAxiosSecure;