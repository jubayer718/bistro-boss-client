
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useCart = () => {
  const axiosInstance = useAxiosSecure();
  const { user, loading } = useAuth();
  
  const {refetch, data: cart = [] } = useQuery({
    queryKey: ['cart',user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/carts?email=${user?.email}`);
      return data
    }
  })
  return [cart,refetch]
};

export default useCart;