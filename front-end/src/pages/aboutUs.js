import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import companyLogo from '../image/logoimage.jpg';
import './style.css';
import Header from './Header';

const { Title, Paragraph } = Typography;


const AboutUsPage = () => {

  useEffect(() => {
    localStorage.setItem("userSelectedMenu", 3);
  }, [])

  return (
    <div className="about-us-container">
      <Header />
      <div className="about-us-content">
        <div className="about-us-text">
          <Title level={2} className="about-us-heading">
            About Us
          </Title>
          <Paragraph className="about-us-description">
            Welcome to E-payment-system, your trusted online payment system. We are dedicated to providing secure, convenient, and innovative e-payment solutions to make your life easier.
          </Paragraph>
          <Paragraph className="about-us-description">
            Our mission is to revolutionize the way payments are made, offering a seamless digital experience that saves you time and eliminates the need for physical transactions. With our e-payment system, you can effortlessly settle bills, transfer funds, and make payments with just a few clicks.
          </Paragraph>
          <Paragraph className="about-us-description">
            We prioritize the security of your financial data. Our platform encrypts sensitive information, ensuring that your transactions are protected and giving you peace of mind. Trust and reliability are at the core of our services, and we strive to deliver the highest level of security and convenience to our users.
          </Paragraph>
          <Paragraph className="about-us-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt ante et feugiat fringilla. Mauris vel purus in leo rhoncus auctor quis at ligula. Suspendisse potenti. Nulla facilisi.
          </Paragraph>
          <Paragraph className="about-us-description">
            We are committed to providing exceptional customer service and constantly improving our platform to meet your evolving needs. Whether you are an individual, a business, or an organization, we have tailored solutions to streamline your payment processes and enhance your financial management.
          </Paragraph>
          <Paragraph className="about-us-description">
            Thank you for choosing E-payment-system. We look forward to serving you and being your trusted partner for all your online payment requirements.
          </Paragraph>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;