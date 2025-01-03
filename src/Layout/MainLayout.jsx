import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const location = useLocation();
  const noHeaderFooter = location.pathname.includes('login')||location.pathname.includes('signUp')
  return (
    <div>
      <nav>
        {noHeaderFooter || <Navbar></Navbar>
        }
      </nav>
      <Outlet></Outlet>
      <footer>
        {noHeaderFooter || <Footer></Footer>
        }
      </footer>
    </div>
  );
};

export default MainLayout;