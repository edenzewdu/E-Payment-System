import React, { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Import custom CSS file

const AdminLogin = () => {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName, Password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        console.log('Admin logged in successfully');
        navigate('/admin/dashboard');
      } else if (response.status === 400) {
        console.error('Bad request:', data.error);
      } else {
        console.error('Admin login failed:', data.error);
      }
    } catch (error) {
      console.error('An error occurred during admin login:', error);
    }

    setLoading(false);

    setUserName('');
    setPassword('');
  };

  useEffect(() => {
    // Redirect to login if not logged in
    if (isLoggedIn) {
      navigate('/admin/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login">
      <h1>Login</h1>
      <Form className="form" onFinish={handleSubmit}>
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
        <Button className="button" type="primary" htmlType="submit" loading={loading} disabled={loading}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default AdminLogin;
