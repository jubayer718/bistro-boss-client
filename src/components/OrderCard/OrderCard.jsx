import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useCart from '../../Hooks/useCart';

const OrderCard = ({ items }) => {
 const axiosSecure=useAxiosSecure()
  const { user } = useAuth();
  const navigate = useNavigate()
  const location = useLocation()
  const [, refetch] = useCart();
  const { recipe, price, name, image, category,_id } = items;
  const handleAddToCart = async (food) => {
    const foodItems = {
      menuId: _id,
      recipe,
      price,
      name,
      image,
      email:user.email
    }
    if (user&&user.email) {
      //send cart to the database
      const { data } = await axiosSecure.post('/carts', foodItems) 
      if (data.insertedId) {
       Swal.fire({
  title:`${name},added to your cart`,
  showClass: {
    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
  },
  hideClass: {
    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
  }
});
     }
      refetch();     
    } else {
      Swal.fire({
  title: "you are not logged in",
  text: "you need to login first",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes,login"
}).then((result) => {
  if (result.isConfirmed) {
    // Swal.fire({
    //   title: "Deleted!",
    //   text: "Your file has been deleted.",
    //   icon: "success"
    // });

    navigate('/login',{state:{from:location}})
        console.log(food);

  }
});
    }


  }
  return (
   <div className="card bg-base-100 shadow-xl">
  <figure>
    <img
      src={image}
      alt="salad img" />
      </figure>
      <p className='absolute  bg-slate-800 py-3 px-5 right-0 mr-4 mt-4 text-white rounded-md'>{ price}</p>
  <div className="card-body flex flex-col justify-center items-center">
        <h2 className="card-title">{ name}</h2>
        <p>{ recipe}</p>
    <div className="card-actions justify-end">
      <button onClick={()=>handleAddToCart(items)} className="btn btn-outline border-0 border-b-4 font-bold border-orange-400 bg-slate-100">add to cart</button>
    </div>
  </div>
</div>
  );
};

export default OrderCard;