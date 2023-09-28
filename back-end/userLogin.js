import React, { useState, useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import companyLogo from '../image/logoimage.jpg';
import USER from '../image/himage3.jpg';
import '../pages/homePage.module.css'; // Import custom CSS file
import axios from 'axios';
import Lock from '../image/simage2.png';
const UserLogin = () => {
  const [Identifier, setIdentifier] = useState('');
  const [Password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Load Google Sign-In API script dynamically
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: '587101034562-48rg0utnf5bs3cem5mcmqpftmg9urf9t.apps.googleusercontent.com',
        callback:" handleGoogleSignIn",
      });
    };

    return () => {
      // Clean up the dynamically added script
      document.body.removeChild(script);
    };
  }, []);

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleSubmit = async () => {
    setLoading(true);
   

    try {
        const response = await fetch('http://localhost:3000/Users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ identifier: Identifier, Password: Password }),
        });

      const data = await response.data;

      if (response.status === 200) {
        setIsLoggedIn(true);
        console.log('User logged in successfully');
        // Perform navigation to the service providers
        navigate('/signup/serviceProviders');


      } else if (response.status === 400) {
        console.error('Bad request:', data.error);
      
      } else {
        console.error('User login failed:', data.error);
        setErrorMessage('Incorrect email or password'); // Set the error message
      }
    } catch (error) {
      console.error('An error occurred during User login:', error);
      setErrorMessage('Incorrect email or password'); // Set the error message
    }

    setLoading(false);
    setIdentifier('');
    setPassword('');
  };
  
 
  const handleForgetPasswordClick = () => {
    navigate('/Users/resetpassword');
  };

  // Define the handleGoogleSignIn function
window.handleGoogleSignIn = async (response) => {
  const { credential } = response;
  setLoading(true);

  try {
    
    // Make the API request with the verified token
    const googleResponse = await axios.post(
      'https://www.googleapis.com/oauth2/v3/tokeninfo',
      {
        id_token: credential, // Update the property name to 'id_token'
      }
    );

    const data = await googleResponse.data;

    if (googleResponse.status === 200) {
      setIsLoggedIn(true);
      console.log('User logged in with Google successfully');
    } else {
      console.error('Google login failed:', data.error);
    }
  } catch (error) {
    console.error('An error occurred during Google login:', error);
  }
  setLoading(false);
};
  
return (

  <div className='container'>
  <div className='header'>
    <div className='logo'>
      <img src={companyLogo} alt='company logo' />
      <div className='company-name'>
        E-payment-system
        <div className='slogan'>your trusted online payment system</div>
      </div>
    </div>
  </div>
    <div className="body">
   
      <Form className="form" onFinish={handleSubmit}>
      <h1>Login</h1>
      <div className='email'>
        <label htmlFor = "Email">
        <img src={USER} alt='login-icon' className='login-icon'></img>
        </label>

        <Input
          type="text"
          name="Email"
          placeholder="Email Address"
          id="Email"
          required
          value={Identifier}
          onChange={handleIdentifierChange}
        />
</div>
<div className='pword'>
        <label htmlFor="password">
        <img src={Lock} alt="Securityimage" className='security-icon'></img>
        </label>

        <Input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          required
          value={Password}
          onChange={handlePasswordChange}
        />
         
        </div>
        {errorMessage && <div style={{color:'red', alignSelf:'right'}} className="error-message">{errorMessage}</div>} {/* Display the error message */}
          <button className="button" type="primary" htmlType="submit" loading={loading} disabled={loading}>
           Login
          </button>
<div className='register'>
        <p>Don't have an account?  <Link to="/signup" >Create new account</Link>..</p>
        <a href="#/"  onClick={handleForgetPasswordClick}>Forgot Password</a>
</div>
      <div id="g_id_onload"
         data-client_id='587101034562-48rg0utnf5bs3cem5mcmqpftmg9urf9t.apps.googleusercontent.com'
         data-callback="handleGoogleSignIn">
      </div>
     
      <div className="g_id_signin"></div>
      
      </Form>
    </div>
    </div>
  );
};

export default UserLogin;