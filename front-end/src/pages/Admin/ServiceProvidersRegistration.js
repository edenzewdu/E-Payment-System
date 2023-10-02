
                 

import React, { useState } from 'react';
import axios from 'axios';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Button, message, Form, Input, Upload, Modal } from 'antd';
import Dashboard from './Dashboard';

const ServiceProviderRegistrationForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    serviceProviderBIN: '',
    serviceProviderName: '',
    servicesOffered: '',
    BankName: '',
    BankAccountNumber: '',
    phoneNumber: '',
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [serviceProviderAuthorizationLetterUrl, setServiceProviderAuthorizationLetterUrl] = useState();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.serviceProviderBIN) {
      newErrors.serviceProviderBIN = 'Business Identification Number is required';
    }

    if (!formData.serviceProviderName) {
      newErrors.serviceProviderName = 'ServiceProviderName is required';
    }

    if (!formData.servicesOffered) {
      newErrors.servicesOffered = 'Services Offered is required';
    }

    if (!formData.BankName) {
      newErrors.BankName = 'Bank Name is required';
    }

    if (!formData.BankAccountNumber) {
      newErrors.BankAccountNumber = 'Bank Account Number is required';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\+?\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('serviceProviderBIN', formData.serviceProviderBIN);
        formDataToSend.append('serviceProviderName', formData.serviceProviderName);
        formDataToSend.append('servicesOffered', formData.servicesOffered);
        formDataToSend.append('BankName', formData.BankName);
        formDataToSend.append('BankAccountNumber', formData.BankAccountNumber);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('serviceProviderAuthorizationLetter', file);

        await axios.post('http://localhost:3000/serviceproviders', formDataToSend);
        message.success('Service provider registered successfully!');
        console.log('Service provider registered successfully!');
        form.resetFields();
        window.location.href = window.location.href;
      } catch (error) {
        message.error('Error submitting form:')
        console.error('Error submitting form:', error);
        // Handle the error, show an error message, etc.
      }
    }
  };

  return (
    <Dashboard
      content={
        <Form name="serviceProviderRegistrationForm" 
        layout="vertical"
        onFinish={handleSubmit}>
          <h1>Service provider Registration</h1>
  
          <Form.Item
            label="Business Identification Number"
            name="serviceProviderBIN"
            validateStatus={errors.serviceProviderBIN && 'error'}
            help={errors.serviceProviderBIN}
            rules={[{ required: true }]}
          >
            <Input name="serviceProviderBIN" onChange={handleChange} placeholder="Enter BIN" />
          </Form.Item>
  
          <Form.Item
            label="Service Provider Name"
            name="serviceProviderName"
            validateStatus={errors.serviceProviderName && 'error'}
            help={errors.serviceProviderName}
            rules={[{ required: true }]}
          >
            <Input name="serviceProviderName" onChange={handleChange} placeholder="Enter Name" />
          </Form.Item>
  
          <Form.Item
            label="Services Offered"
            name="servicesOffered"
            validateStatus={errors.servicesOffered && 'error'}
            help={errors.servicesOffered}
            rules={[{ required: true }]}
          >
            <Input name="servicesOffered" onChange={handleChange} placeholder="Enter Services Offered" />
          </Form.Item>
  
          <Form.Item
            label="Bank Name"
            name="BankName"
            validateStatus={errors.BankName && 'error'}
            help={errors.BankName}
            rules={[{ required: true }]}
          >
            <Input name="BankName" onChange={handleChange} placeholder="Enter Bank Name" />
          </Form.Item>
  
          <Form.Item
            label="Bank Account Number"
            name="BankAccountNumber"
            validateStatus={errors.BankAccountNumber && 'error'}
            help={errors.BankAccountNumber}
            rules={[{ required: true }]}
          >
            <Input name="BankAccountNumber" onChange={handleChange} placeholder="Enter Bank Account Number" />
          </Form.Item>
  
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            validateStatus={errors.phoneNumber && 'error'}
            help={errors.phoneNumber}
            rules={[{ required: true }]}
          >
            <Input name="phoneNumber" onChange={handleChange} placeholder="Enter Phone Number" />
          </Form.Item>
  
          <Form.Item>
            <label htmlFor="serviceProviderAuthorizationLetter">Authorization Letter:</label>
            <input
              type="file"
              id="serviceProvider"
              accept=".jpeg, .jpg, .png, .gif"
              onChange={handleFileChange}
            />
            {serviceProviderAuthorizationLetterUrl && (
              <img src={serviceProviderAuthorizationLetterUrl} alt="Auth Letter" style={{ width: '200px' }} />
            )}
          </Form.Item>
  
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      }
    />
  );
    };

export default ServiceProviderRegistrationForm;