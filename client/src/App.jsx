import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Router from './Routes/Router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { TOOLS } from "./Data/Tools"; // adjust path
import { BOOKINGS } from "./Data/Bookings";
import { Users } from "./Data/Users";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("agroBookings")) {
      localStorage.setItem("agroBookings", JSON.stringify(BOOKINGS));
    }
  }, []);

  

useEffect(() => {
  const existingTools = localStorage.getItem("agroTools");

  if (!existingTools) {
    localStorage.setItem("agroTools", JSON.stringify(TOOLS));
  }
}, []);



useEffect(() => {
  if (!localStorage.getItem("agroUsers")) {
    localStorage.setItem("agroUsers", JSON.stringify(Users));
  }
}, []);

  const hideNavbarFooter = [
    '/login',
    '/signup',
    '/signin',
    '/forgot-password'
  ].includes(location.pathname.toLowerCase());

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <main className="min-h-screen w-full">
        <Router />
      </main>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
