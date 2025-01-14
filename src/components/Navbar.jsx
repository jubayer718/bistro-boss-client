import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { Result } from 'postcss';
import Swal from 'sweetalert2';
import { FaCartShopping } from "react-icons/fa6";
import useCart from '../Hooks/useCart';
import useAdmin from '../Hooks/useAdmin';

const Navbar = () => {
  const { user, handleSignOut } = useAuth();
  const [cart] = useCart();
  const [isAdmin] = useAdmin();

  const logOut = () => {
    handleSignOut()
      .then(Result => {
        Swal.fire('signout success')
       })
      .catch(error => {
      console.log(error);
    })
  }
  const navOptions = <>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/menu'>OurMenu</Link></li>
    <li><Link to='/order/salad'>Order Food</Link></li>
   
    {
      user&&isAdmin&& <li><Link to='/dashboard/adminHome'>Dashboard</Link></li>
    }{
      user&& !isAdmin&& <li><Link to='/dashboard/userHome'>Dashboard</Link></li>
    }
    
    {
      user ? <>
        {/* <span className='text-xs'>{ user?.displayName}</span> */}
        <Link to='/dashboard/cart'  className="btn">
  <p><FaCartShopping /></p>
          <div className="badge badge-secondary">+{ cart.length}</div>
</Link >
        <li><button onClick={logOut} className='btn btn-ghost'>log out</button></li>
      </> : <>
              <li><Link to='/login'>Login</Link></li>

      </>
  }
       
  </>
  return (
   <div className="navbar fixed z-30 bg-opacity-30 bg-black text-white max-w-5xl">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
      
            {navOptions}


      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Bistro Boss</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navOptions}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn btn-neutral">Get Started</a>
  </div>
</div>
  );
};

export default Navbar;