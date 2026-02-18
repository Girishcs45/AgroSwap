import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from "../Auth/ProtectedRoute";

import Home from '../pages/Home'
import ToolsForRent from '../pages/ToolsForRent';
import RenterDashboard from '../pages/RenterPages/RenterDashbord';
import ListerDashboard from '../pages/ListerPages/ListerDashboard';
import ToolDetails from '../pages/ToolDetails';
import AddTool from '../pages/ListerPages/AddTool';
import MyTools from '../pages/ListerPages/MyTools';
import Bookings from '../pages/ListerPages/Bookings';
import MyBookings from '../pages/RenterPages/MyBookings';
import BookingDetails from '../pages/RenterPages/BookingDetails';
import EditTool from '../pages/ListerPages/EditTool';
import Action from '../pages/ListerPages/Action';
import PaymentPage from '../pages/Payment';
import LoginPage from '../Auth/Login';
import Signup from '../Auth/Signup';
import ForgotPassword from '../Auth/ForgotPassword';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />      
      <Route path="/tools" element={<ToolsForRent />} />  
      <Route path="/tooldetails/:id" element={<ToolDetails />} />
      <Route path="/payment/:id" element={<PaymentPage/>}/>

      {/* AUTH */}
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>

      {/* RENTER PROTECTED */}
      <Route
        path="/renter"
        element={
          <ProtectedRoute allowedRole="renter">
            <RenterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute allowedRole="renter">
            <MyBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking-details/:id"
        element={
          <ProtectedRoute allowedRole="renter">
            <BookingDetails />
          </ProtectedRoute>
        }
      />

      {/* LISTER PROTECTED */}
      <Route
        path="/lister"
        element={
          <ProtectedRoute allowedRole="lister">
            <ListerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-tool"
        element={
          <ProtectedRoute allowedRole="lister">
            <AddTool />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-tools"
        element={
          <ProtectedRoute allowedRole="lister">
            <MyTools />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <ProtectedRoute allowedRole="lister">
            <Bookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-tool/:id"
        element={
          <ProtectedRoute allowedRole="lister">
            <EditTool />
          </ProtectedRoute>
        }
      />
      <Route
        path="/action/:id"
        element={
          <ProtectedRoute allowedRole="lister">
            <Action />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
