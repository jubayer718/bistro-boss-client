import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './dashboard.css'
import { FaAd, FaHome, FaSearch, FaUtensilSpoon } from 'react-icons/fa';
import { FaBook, FaCalendar, FaCartShopping, FaList, FaShop, FaUsers } from 'react-icons/fa6';
import useCart from '../../Hooks/useCart';
import { MdEmail } from 'react-icons/md';
import useAdmin from '../../Hooks/useAdmin';
import useAuth from '../../Hooks/useAuth';

const Dashboard = () => {
  const { loading } = useAuth()
  const [isAdmin] = useAdmin();
    const [cart] = useCart();
  if (loading) {
    return <div className='flex items-center justify-center my-20'><progress className="progress w-56 "></progress></div>
  }

// const isAdmin=false
  return (
    <div className='flex gap-5  '>
      <div className=''>
        {
          isAdmin ? <>
          
            <ul className="menu  w-56 min-h-screen bg-orange-400 text-xl">
          <li><NavLink to='/dashboard/adminHome'>
            <FaHome></FaHome>
            Admin Home</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/addItems'>
             <FaUtensilSpoon></FaUtensilSpoon>
              Add Items
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/manageItem'>
              <FaList></FaList>
           Manage Item
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/manageBooking'>
              <FaBook></FaBook>
              Manage Booking
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/allUsers'>
              <FaUsers></FaUsers>
            All Users
            </NavLink>
          </li>

           <div className='divider'></div>
          <li><NavLink to='/'>
            <FaHome></FaHome>
            Home</NavLink>
          </li>
          <li><NavLink to='/order/menu'>
          <FaSearch></FaSearch>
            Menu</NavLink>
          </li>
          <li><NavLink to='/order/shop'>
            <FaShop></FaShop>
            Shop</NavLink>
          </li>
          <li><NavLink to='/order/contact'>
            <MdEmail></MdEmail>
            Contact</NavLink>
          </li>
        </ul>
          </> : <>
          
              <ul className="menu  w-56 min-h-screen bg-orange-400 text-xl">
          <li><NavLink to='/dashboard/userHome'>
            <FaHome></FaHome>
            User Home</NavLink>
          </li>
          <li>
            <NavLink to='reservation'>
              <FaCalendar></FaCalendar>
              Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to='cart'>
              <FaCartShopping></FaCartShopping>
              My Cart
              ({ cart.length})
            </NavLink>
          </li>
          <li>
            <NavLink to='review'>
              <FaAd></FaAd>
              Add Review
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/paymentHistory'>
              <FaList></FaList>
              Payment History
            </NavLink>
          </li>

           <div className='divider'></div>
          <li><NavLink to='/'>
            <FaHome></FaHome>
            Home</NavLink>
          </li>
          <li><NavLink to='/order/menu'>
          <FaSearch></FaSearch>
            Menu</NavLink>
          </li>
          <li><NavLink to='/order/contact'>
            <MdEmail></MdEmail>
            Contact</NavLink>
          </li>
        </ul>
            </>
      }
       
      </div>
      
      <div className='flex-1 mt-5'>
        
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;