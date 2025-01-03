import React from 'react';
import useCart from '../Hooks/useCart';
import { FaTrash } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const Cart = () => {
  const [cart,refetch] = useCart();
  const axiosInstance =useAxiosSecure()
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++){
    totalPrice=cart[i].price+totalPrice
  }


  const handleDelete = (id) => {
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async(result) => {
  if (result.isConfirmed) {
    
    const { data } = await axiosInstance.delete(`/carts/${id}`);
    if (data.deletedCount > 0) {
      refetch()
      Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
    }
  }
});
  }
  return (
    <div>
      <div className='flex items-center justify-evenly'>
          <h2 className="text-3xl font-bold">Total Order:{cart.length }</h2>
          <h2 className="text-3xl font-bold">Total Price:${totalPrice.toFixed(2)}</h2>
          <button className='btn btn-primary'>Pay</button>
      </div>
       <div className="overflow-x-auto">
      <table className="table w-full mt-8">
        {/* head */}
        <thead>
          <tr>
            <th>No:</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((item, idx) =>

              <tr key={item._id}>
                <td>{idx+1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>

                  </div>
                </td>
                <td>
                  {item.name}
                </td>
                <td>${ item.price}</td>
                <th>
                  <button onClick={()=>handleDelete(item._id)} className="btn btn-ghost btn-lg"><FaTrash className='text-red-600'></FaTrash></button>
                </th>
              </tr>
            )
          }




        </tbody>

      </table>
    </div>
    </div>
   
  );
};

export default Cart;