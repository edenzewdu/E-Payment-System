import React from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../image/logoimage.jpg';
import USER from '../image/himage3.jpg';
import './homePage.css';
import Header from './Header';

function ContactUs() {
  return (
    <div className='container'>
      <div className="overlay-curve"></div>
      <Header/>

      <div className='body'>
        <h1 className='contactus'>Contact Us</h1>
        <p style={{paddingLeft: '2%'}}>For any inquiries or assistance, please reach out to our support team:</p>
        <div className='contact-info'>
          <h3>Email:</h3>
          <p>support@epaymentsystem.com</p>
        </div>
        <div className='contact-info'>
          <h3>Phone:</h3>
          <p>+251-911-23-76-34</p>
        </div>
        <div className='contact-info'>
          <h3>Mailing Address:</h3>
          <p>Bole, Addis Ababa, Ethiopia</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;