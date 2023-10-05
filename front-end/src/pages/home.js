import React from 'react';
import './style.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import companyLogo from '../image/logoimage.jpg';
import BodyPhoto from '../image/pimage1.jpg';
import USER from '../image/himage3.jpg';
import Bill from '../image/bimage2.png';
import Security from '../image/simage.png';
import Cash from '../image/mimage.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'antd';
import { Layout, Button, Input, Modal, message } from 'antd';
import {
  LogoutOutlined,
  HomeOutlined
} from '@ant-design/icons';
import Header from './Header.js'

const { Content, Footer, Sider } = Layout;


const HomePage = ()=> {
  

  useEffect(()=>{
    localStorage.setItem("userSelectedMenu", 1);
  },[])

  
 

  return (<div >
    <Header/>
      <div className='body'>
          <div className='body-1'>
            <div className='side-one'>
              <img src={BodyPhoto} alt='bodyphoto' className='body-image'></img>
            </div>
            <div className='side-two'>
              <div className='note1'>
                <h2> E-<span style={{ color: 'rgb(5, 145, 246)' }}>Payment</span> System</h2>
              </div>
              <div className='note2'>
                <h1>  <pre>Make Your Life </pre>
                  <pre>Easier With <span style={{ color: 'rgb(5, 145, 246)' }}>...</span></pre></h1>
              </div>
              <br />
              <hr className='horizontal-line' />
              <div className='note3'>
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Fusce tincidunt ante et feugiat fringilla.
                  Mauris vel purus in leo rhoncus auctor quis at ligula.
                  Suspendisse potenti. Nulla facilisi.</h4>
              </div>
            </div>
          </div>
<br/>
          <div className='body-2'>
            <div className='msg'>
              <img src={Bill} alt="billimage" className='bill-icon'></img>
              <h5>Effortlessly settle bills digitally, saving time and eliminating physical transactions.</h5>
            </div>
            <div className='msg'>
              <img src={Cash} alt="cashimage" className='cash-icon'></img>
              <h5>Encrypting financial data ensures secure transactions, providing peace of mind.</h5>
            </div>
            <div className='msg'>
              <img src={Security} alt="Securityimage" className='security-icon'></img>
              <h5>Revolutionize payments with our secure, convenient, and innovative e-payment system.</h5>
            </div>
          </div>
        </div>
        </div>
  ) ;
}

export default HomePage;