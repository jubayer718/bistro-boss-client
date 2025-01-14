import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const PaymentHistory = () => {

  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const { data: payment = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn:async()=> {
      const res = await axiosInstance.get(`/payments/${user.email}`);
      return res.data;
    }
  })



  return (
    <div>
      <h2 className="text-3xl">Payment History: {payment.length}</h2>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Price</th>
        <th>TransactionId</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {payment.map((item,index)=><tr key={item._id} className="bg-base-200">
        <th>{ index +1}</th>
        <td> ${ item.price}</td>
        <td>{ item.transactionId}</td>
        <td>{ item.status}</td>
      </tr>)}
      
     
    </tbody>
  </table>
</div>
    </div>
  );
};

export default PaymentHistory;