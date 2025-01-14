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
import AllUser from "../pages/Dashboard/AllUser/AllUser";
import AddItems from "../pages/Dashboard/addItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import { axiosPublic } from "../Hooks/userAxiosPublic";
import Payment from "../pages/Dashboard/Payment/Payment";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";

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
      }, {
        path: 'payment',
        element:<Payment></Payment>
      }, {
        path: 'userHome',
        element:<UserHome></UserHome>
      }, {
        path: 'paymentHistory',
        element:<PaymentHistory></PaymentHistory>
      },
     
      // admin only related route
      {
        path: 'adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'addItems',
        element:<AdminRoute><AddItems></AddItems></AdminRoute>
      }, {
        path: 'manageItem',
        element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
      }, {
        path: 'updateItem/:id',
        element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`),
      },
      {
        path: 'allUsers',
        element:<AdminRoute><AllUser></AllUser></AdminRoute>

      }
    ]
  }
])