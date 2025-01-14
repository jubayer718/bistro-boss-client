import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { use } from 'react';
import { FaTrash, FaUsers } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const AllUser = () => {
  const axiosInstance = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = axiosInstance.get('/users')
      return (await res).data;
    }
  })


  const makeAdmin = (user) => {
    axiosInstance.patch(`/users/admin/${user._id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch()
        Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your work has been saved",
  showConfirmButton: false,
  timer: 1500
});
      }
    })
}
  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {

        const { data } = await axiosInstance.delete(`/users/${user._id}`);
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
      <div className='flex justify-evenly'>
        <h2 className="text-3xl">All User</h2>
        <h2 className="text-3xl">Total User: {users.length}</h2>

      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              users.map((user, idx) => (
                <tr key={user._id}>
                  <th>{idx + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className=' '>{user.role==='admin'?'admin':<button onClick={()=>makeAdmin(user)} className='btn bg-orange-600 '><FaUsers className='text-2xl'></FaUsers></button> }</td>
                  <td>
                    <button onClick={() => handleDelete(user)} className="btn btn-ghost btn-lg"><FaTrash className='text-red-600'></FaTrash></button>

                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AllUser;