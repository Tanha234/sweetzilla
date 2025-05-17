// src/Root.jsx
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';


const Root = () => {
  return (
    <div>
     <Navbar/>
      <Outlet /> {/* 👈 This is critical to show nested routes */}
      <Footer/>
    </div>
  );
};

export default Root;
