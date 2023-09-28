import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';
import './homePage.module.css';
import { useNavigate } from 'react-router-dom';
import companyLogo from '../image/logoimage.jpg';
import { Select } from 'antd';



const RegistrationForm = () => {

  
const { Option } = Select;
const [counter, setCounter] = useState(1);

const getNextUserID = () => {
  const timestamp = Date.now().toString(); // Get the current timestamp
  const randomNumber = Math.floor(Math.random() * 10000).toString(); // Generate a random number between 0 and 9999
  return `P${timestamp}${randomNumber}`;
};

const incrementCounter = () => {
  setCounter((prevCounter) => prevCounter + 1);
};

  const [formData, setFormData] = useState({
    UserID: getNextUserID(),
    FirstName: '',
    LastName: '',
    Gender: '',
    UserName: '',
    Password: '',
    Email:'',
    PhoneNumber: '+251',
    Address:'',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.FirstName) {
      newErrors.FirstName = 'Business Identification Number is required';
    }

    if (!formData.LastName) {
      newErrors.LastName = 'LastName is required';
    }

    if (!formData.Gender) {
      newErrors.Gender = 'Gender is required';
    }

    if (!formData.UserName) {
      newErrors.UserName = 'Bank Name is required';
    }

    if (!formData.Password) {
      newErrors.Password = 'Bank Account Number is required';
    }
    if (!formData.Email) {
        newErrors.Email = 'email is required';
      }
      else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
        newErrors.Email = "Email is invalid";
      }
      if (!formData.Address) {
        newErrors.Address = 'Bank Account Number is required';
      }


    if (!formData.PhoneNumber) {
      newErrors.PhoneNumber = "Phone Number is required";
    } else if (!/^\+[0-9\s-()]+$/.test(formData.PhoneNumber)) {
      newErrors.PhoneNumber = "Phone Number is invalid";
     } //else if (formData.PhoneNumber.replace(/[^\d]/g, "").length < 12) {
    //   newErrors.PhoneNumber = "Phone Number must have at least 12 digits";
    // }

  

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

 
  const checkUserExists = async (email) => {
    try {
      const response = await axios.get('http://localhost:3000/Users');
      const users = response.data;
      const userExists = users.some((user) => user.Email === email);
      return userExists;
    } catch (error) {
      console.error('Error checking user existence:', error);
      throw error;
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userExists = await checkUserExists(formData.Email);
        if (userExists) {
          setErrors({ Email: 'User already exists' });
          console.log('Existing user:', formData.Email);
        } else {
          const formDataToSend = new FormData();
          formDataToSend.append('UserID', formData.UserID);
          formDataToSend.append('FirstName', formData.FirstName);
          formDataToSend.append('LastName', formData.LastName);
          formDataToSend.append('Gender', formData.Gender);
          formDataToSend.append('UserName', formData.UserName);
          formDataToSend.append('Password', formData.Password);
          formDataToSend.append('PhoneNumber', formData.PhoneNumber);
          formDataToSend.append('Email', formData.Email);
          formDataToSend.append('Address', formData.Address);
  
          await axios.post('http://localhost:3000/Users', formDataToSend);
  
          console.log('Registered successfully!');
          // Perform navigation to the service providers
          navigate('/signup/serviceProviders');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
<div className='body'>
    <form onSubmit={handleSubmit}>
      <div className="form-box">
      
        <div>
          <label>UserID</label>
          <input
            type="text"
            name="UserID"
            className="input-field"
            value={formData.UserID}
            onChange={handleChange}
            disabled
          />
        </div>
        <div>
        <label>FirstName</label>
          <input
            type="text"
            name="FirstName"
            className="input-field"
            value={formData.FirstName}
            onChange={handleChange}
            placeholder="enter firstname "
          />
          {errors.FirstName && <span>{errors.FirstName}</span>}
        </div>
        <div>
          <label>LastName:</label>
          <input
            type="text"
            name="LastName"
            className="input-field"
            value={formData.LastName}
            onChange={handleChange}
            placeholder="enter lastname "
          />
          {errors.LastName && <span>{errors.LastName}</span>}
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="Gender"
            className="input-field"
            value={formData.Gender}
            onChange={handleChange}
            placeholder="enter gender "
          />
          {errors.Gender && <span>{errors.Gender}</span>}
        </div>
        <div>
          <label>UserName:</label>
          <input
            type="text"
            name="UserName"
            className="input-field"
            value={formData.UserName}
            onChange={handleChange}
            placeholder="enter username"
          />
          {errors.UserName && <span >{errors.UserName}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="Password"
            className="input-field"
            value={formData.Password}
            onChange={handleChange}
            placeholder="enter password "
          />
          {errors.Password && <span>{errors.Password}</span>}
        </div>
        <div>
          <label>Confirm password</label>
          <input
            type="text"
            name="Password"
            className="input-field"
            value={formData.Password}
            onChange={handleChange}
            placeholder="Re-enter password "
          />
          {errors.Password && <span>{errors.Password}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="PhoneNumber"
            className="input-field"
            value={formData.PhoneNumber}
            onChange={handleChange}
            placeholder="enter phone number"
          />
          {errors.PhoneNumber && <span>{errors.PhoneNumber}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="Email"
            className="input-field"
            value={formData.Email}
            onChange={handleChange}
            placeholder="enter email address"
          />
          {errors.Email && <span>{errors.Email}</span>}
        </div>
       
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="Address"
            className="input-field"
            value={formData.Address}
            onChange={handleChange}
            placeholder="enter address "
          />
          {errors.Address && <span>{errors.Address}</span>}
        </div>
        <br></br>
      
        <button className="button" type="buttom" htmlType="submit" >
           Submit
          </button>
        
    </div>
  </form>
  </div>
</div>
);
};


export default RegistrationForm;