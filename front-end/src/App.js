import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/Admin/AdminLogin';
import AgentsList from './pages/Admin/AgentsList';
import ServiceProvidersList from './pages/Admin/ServiceList';
import UsersList from './pages/Admin/AdminsList';
import ServiceProviderRegistrationForm from './pages/Admin/ServiceProvidersRegistration';
import AdminRegistrationForm from './pages/Admin/AdminRegistration';
import AgentRegistrationForm from './pages/Admin/AgentRegistration';
import PaymentList from './pages/Admin/Transactions';
import HomePage from './pages/home';
import Home from './pages/Admin/index';
import AdminsList from './pages/Admin/AdminsList';
import UserLogin from './pages/userLogin';
import RegistrationForm from './pages/userRegistration';
import ServiceProvidersDetails from './pages/chooseServiceProvider';
import Payment from './pages/payment';
import ServiceNumber from './pages/serviceNumber';
import ResetPasswordForm from './pages/resetPassword';
import UpdatePassword from './pages/updatePassword';
import Header from './pages/Header';
import ContactUs from './pages/contactUs';
import AboutUsPage from './pages/aboutUs';
import PaymentHistory from './pages/paymentHistory';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/users" element={<HomePage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/aboutUs" element={<AboutUsPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/serviceProviders" element={<ServiceProvidersDetails />} />
        <Route path="/serviceNumber" element={<ServiceNumber />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/history" element={<PaymentHistory />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/:adminId" element={<Home />} />
        <Route path="/users/resetpassword" element={<ResetPasswordForm />} />
        <Route path="/users/updatepassword" element={<UpdatePassword />} />
        <Route
          path="/admin/agents/:adminId"
          element={<AgentsList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/admin/agents/registration/:adminId"
          element={<AgentRegistrationForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/admin/service-providers/:adminId"
          element={<ServiceProvidersList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/admin/usersList/:adminId" element={<UsersList />} />
        <Route path="/admin/adminsList/:adminId" element={<AdminsList />} />
        <Route
          path="/admin/service-providers/registration/:adminId"
          element={<ServiceProviderRegistrationForm />}
        />
        <Route path="/admin/user/registration/:adminId" element={<AdminRegistrationForm />} />
        <Route path="/admin/transactions/:adminId" element={<PaymentList />} />
      </Routes>
    </Router>
  );
}

export default App;