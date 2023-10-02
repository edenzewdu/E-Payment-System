import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Menu, Avatar, Button, message, Form, Input, Upload, Modal } from 'antd';
import Dashboard from "./Dashboard";
import { useNavigate, useParams } from "react-router-dom";

const AgentRegistrationForm = () => {
  //const { adminId } = useParams();
  // const navigate = useNavigate();
  // if (!localStorage.getItem('adminData')) {
  //   navigate('/admin/login');
  // }
  const [form] = Form.useForm();
  const [agentData, setAgentData] = useState({
    agentBIN: '',
    agentName: '',
    agentEmail: '',
    servicesOffered: '',
    phoneNumber: '+251',
    agentAuthorizationLetter: null,
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [agentAuthorizationLetterUrl, setAgentAuthorizationLetterUrl] = useState();


  const validateForm = () => {
    const newErrors = {};

    if (!agentData.agentBIN) {
      newErrors.agentBIN = "Business Identification Number is required";
    }

    if (!agentData.agentName) {
      newErrors.agentName = "Bank Name is required";
    }

    if (!agentData.agentEmail) {
      newErrors.agentEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(agentData.agentEmail)) {
      newErrors.agentEmail = "Email is invalid";
    }

    if (!agentData.servicesOffered) {
      newErrors.servicesOffered = "Services Offered is required";
    }

    
    if (!agentData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\+?\d+$/.test(agentData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number is invalid';
    }

    // if (!agentData.agentAuthorizationLetter) {
    //   newErrors.agentAuthorizationLetter = "Agent Authorization Letter is required";
    // } else if (!isFileValid(agentData.agentAuthorizationLetter)) {
    //   newErrors.agentAuthorizationLetter = "Invalid file format. Only JPG, JPEG, PNG, or PDF files are allowed.";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentData((prevData) => ({
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

      const formData = new FormData();
      formData.append("agentBIN", agentData.agentBIN);
      formData.append("agentName", agentData.agentName);
      formData.append("agentEmail", agentData.agentEmail);
      formData.append("servicesOffered", agentData.servicesOffered);
      formData.append("phoneNumber", agentData.phoneNumber);
      formData.append("agentAuthorizationLetter", file);





   await axios.post('http://localhost:3000/agents', formData);
        message.success('agent registered successfully!');
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
    <Dashboard content={
      <Layout.Content className="agent-registration-content">
      <Form name="serviceProviderRegistrationForm" 
      form={form}
      layout="vertical"
    >


        <h1>Agent Registration</h1>

        <Form.Item
            label="Business Identification Number"
            name="agentBIN"
            validateStatus={errors.agentBIN && 'error'}
            help={errors.agentBIN}
            rules={[{ required: true }]}
          >
            <Input name="agentBIN" onChange={handleChange} placeholder="Enter the agent business Identification Number" />
          </Form.Item>

          <Form.Item
            label="Agent Name"
            name="agentName"
            validateStatus={errors.agentName && 'error'}
            help={errors.agentName}
            rules={[{ required: true }]}
          >
            <Input name="agentName" onChange={handleChange} placeholder="Enter Agent's Name"/>
          </Form.Item>

          <Form.Item
            label="Agent Email"
            name="agentEmail"
            validateStatus={errors.agentEmail && 'error'}
            help={errors.agentEmail}
            rules={[{ required: true }]}
          >
            <Input name="agentEmail" onChange={handleChange} placeholder="Enter Agent's Email address"/>
          </Form.Item>

        <Form.Item
            label="Services Offered"
            name="servicesOffered"
            validateStatus={errors.servicesOffered && 'error'}
            help={errors.servicesOffered}
            rules={[{ required: true }]}
          >
            <Input name="servicesOffered" onChange={handleChange} placeholder="List the services that this Agent would give" />
          </Form.Item>

        <Form.Item
            label="Phone Number"
            name="phoneNumber"
            validateStatus={errors.phoneNumber && 'error'}
            help={errors.phoneNumber}
            rules={[{ required: true }]}
          >
            <Input name="phoneNumber" onChange={handleChange} placeholder="Enter Agent's Phonenumber"/>
          </Form.Item>


        <Form.Item>
          <label htmlFor="agentAuthorizationLetter">Agent Authorization Letter:</label>
          <input
            type="file"
            name="agentAuthorizationLetter"
            id="agentAuthorizationLetter"
            accept=".jpeg, .jpg, .png, .gif"
            onChange={handleFileChange}
            rules={[{ required: true }]}
          />
          {agentAuthorizationLetterUrl && (
            <img src={agentAuthorizationLetterUrl} alt="Auth Letter" style={{ width: '200px' }} />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Register</Button>
        </Form.Item>
      </Form>
      </Layout.Content>
    } />
  );
};

export default AgentRegistrationForm;