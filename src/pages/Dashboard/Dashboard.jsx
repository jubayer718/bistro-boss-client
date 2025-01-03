import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './dashboard.css'
import { FaAd, FaHome, FaSearch } from 'react-icons/fa';
import { FaCalendar, FaCartShopping, FaList } from 'react-icons/fa6';
import useCart from '../../Hooks/useCart';

const Dashboard = () => {
  const [cart] = useCart();

  

  return (
    <div className='flex gap-5  '>
      <div className=''>
        <ul className="menu  w-56 min-h-screen bg-orange-400 text-xl">
          <li><NavLink to='userHome'>
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
            <NavLink to='booking'>
              <FaList></FaList>
              My Booking
            </NavLink>
          </li>

           <div className='divider'></div>
          <li><NavLink to='/'>
            <FaHome></FaHome>
            Home</NavLink>
          </li>
          <li><NavLink to='/order/salad'>
          <FaSearch></FaSearch>
            Menu</NavLink>
          </li>
        </ul>
       
      </div>
      <div className='flex-1 mt-5'>
        
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;