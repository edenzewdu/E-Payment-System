import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import './AdminLogin.css'; // Import custom CSS file

const AdminLogin = () => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

try {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ UserName, Password }),
  });

  const data = await response.json();

  if (response.ok) {
    // Admin login successful-Redirect to the admin dashboard
    
    setIsLoggedIn(true); 
    console.log('Admin logged in successfully');
  } else if (response.status === 400) {
    // Handle bad request
    console.error('Bad request:', data.error);
  } else {
    // Admin login failed
    // Handle the error response from the server
    console.error('Admin login failed:', data.error);
  }
} catch (error) {
  console.error('An error occurred during admin login:', error);
}

    // Clear form fields
    setUserName('');
    setPassword('');
  };

  if (isLoggedIn) {
    return <Redirect to="/admin/dashboard" />;
  }

  return (
    <Container >
      <div className="login">
        <h1>Login</h1>
        <Form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">
            <UserOutlined className="icon" />
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username or Email"
            id="username"
            required
            value={UserName}
            onChange={handleUsernameChange}
          />
          <label htmlFor="password">
            <LockOutlined className="icon" />
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            required
            value={Password}
            onChange={handlePasswordChange}
          />
          <Button className="button" type="submit">Login</Button>
        </Form>
      </div>
    </Container>
  );
};

export default AdminLogin;