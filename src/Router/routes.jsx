import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import OurMenu from "../pages/OurMenu/OurMenu";
import Order from "../pages/Order/Order";
import Login from "../pages/login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Secret from "../pages/Secret/Secret";
import PrivateRoute from "./Private/PrivateRoute";
import Cart from "../components/cart";
import Dashboard from "../pages/Dashboard/Dashboard";

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element:<Home></Home>
      },
      {
        path: '/menu',
        element:<OurMenu></OurMenu>
      },
      {
        path: '/order/:category',
        element:<Order></Order>
      }, {
        path: '/login',
        element:<Login></Login>
      },
      {
        path: '/signUp',
        element:<SignUp></SignUp>
      }, {
        path: '/secret',
        element:<PrivateRoute><Secret></Secret></PrivateRoute>
      }
    ]
  }, {
    path: 'dashboard',
    element:<Dashboard></Dashboard>,
    children: [
      {
        path: 'cart',
        element:<Cart></Cart>
      }
    ]
  }
])