import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Root from './Root';
import "sweetalert2/dist/sweetalert2.min.css";

import AdminRoute from './components/AdminRoute/AdminRoute';
import AdminPage from './components/AdminPage/AdminPage';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import AboutUs from './components/About/About';
import CakeCard from './components/CakeCard/CakeCard';
import CakeDetailsPage from './components/CakeDetailsPage/CakeDetailsPage';
import CartPage from './components/CartPage/CartPage';
import CheckoutPage from './components/CartPage/CheckoutPage';
import BuyNowPage from './components/CartPage/BuyNowPage';
import ProfilePage from './components/Profile/Profile';
import CakeEntryForm from './components/AdminPage/CakeEntryForm';
import EditCakePage from './components/AdminPage/EditCakePage';
import CustomCakeOrderForm from './components/CakeCard/CustomCakeOrderForm';
import CakeGallery from './components/Gallery/Gallery';
import ContactUs from './components/ConatctUs/ContactUs';


// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about", // Absolute path
        element: <AboutUs />,
      },
      {
        path: "/cakes",
        element: <CakeCard />,
      },
      {
        path: "/cake/:id",
        element: <CakeDetailsPage />,
      },
      {
        path: "/cart",
        element: <CartPage/>,
      },
      {
        path: "/checkout",
        element: <CheckoutPage/>,
      },
      {
        path: "/buy-now",
        element: <BuyNowPage/>,
      },
      {
        path: "/profile",
        element: <ProfilePage/>,
      },
      {
        path: "/addCake",
        element: <CakeEntryForm/>,
      },
      {
        path: "/addCustomCake",
        element: <CustomCakeOrderForm/>,
      },
      {
        path: "/gallery",
        element: <CakeGallery/>,
      },
      {
        path: "/cakes/edit/:id",
        element: <EditCakePage/>,
       
      },
      {
        path: "/contact",
        element: <ContactUs/>,
       
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        ),
      },
    ],
  },
]);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
