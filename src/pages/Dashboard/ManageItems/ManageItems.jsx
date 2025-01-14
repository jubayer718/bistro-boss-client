import React from 'react';
import SectionTitle from '../../../components/SectionTitle';
import useMenu from '../../../Hooks/useMenu';
import { FaTrash } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ManageItems = () => {

  const [menu,,refetch] = useMenu();
  const axiosInstance = useAxiosSecure();
  const handleDelete = (item) => {
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to delete this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async(result) => {
  if (result.isConfirmed) {
    const res = await axiosInstance.delete(`/menu/${item._id}`);
    // console.log(res.data);
    if (res.data.deletedCount > 0) {
     refetch()
      Swal.fire({
  position: "top-end",
  icon: "success",
  title: `${item.name} has been delete`,
  showConfirmButton: false,
  timer: 1500
});
    }
    
  }
});
  }
  return (
    <div>
      <SectionTitle heading="Manage all Items" subHeading="Hurry Up"></SectionTitle>
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          No
        </th>
        <th>Item Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
            {
              menu.map((item,index)=> <tr key={item._id}>
        <th >
         {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item.image}
                  alt={item.name} />
              </div>
            </div>
            
          </div>
        </td>
        <td>
         {item.name}
        
        </td>
                <td className='text-right'>${ item.price}</td>
                <td >
                  <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button className='btn btn-ghost bg-orange-600 '><FaEdit className='text-md'></FaEdit></button>
                  </Link>
                </td>
                <td >
                  <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-lg"><FaTrash className='text-red-600'></FaTrash></button>
                </td>
        
      </tr>)
      }
     
 
    </tbody>
  
  </table>
</div>

    </div>
  );
};

export default ManageItems;