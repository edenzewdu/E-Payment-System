import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './Admin/AdminLogin.js';
import Dashboard from './Admin/Dashboard.js';
import ProfilePage from './Admin/AdminProfile.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/admin/dashboard"
          element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route 
        path="/admin/profile"
        element= {<ProfilePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />}
        />
      </Routes>
    </Router>
  );
}

export default App;