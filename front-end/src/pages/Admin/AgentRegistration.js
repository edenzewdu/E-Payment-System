import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Menu, Avatar, Button, message, Form, Input, Upload, Modal, Spin } from 'antd';
import Dashboard from "./Dashboard";
import { useNavigate, useParams } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";

const AgentRegistrationForm = () => {

  const [adminData, setAdminData] = useState(JSON.parse(localStorage.getItem('adminData')));
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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
 useEffect(() => {
    if (!adminData) {
      setTimeout(() => {
        navigate('/admin/login');
        message.error('Please login to access the dashboard');
      }, 5000);
    } else {
      setIsLoading(false);
    }
    localStorage.setItem('selectedMenu', 2);
  }, [adminData, navigate]);


  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
        <p>Please wait while we check your login status...</p>
      </div>
    );
  }

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

    if (!agentData.agentAuthorizationLetter) {
      newErrors.agentAuthorizationLetter = "Agent Authorization Letter is required";
    }
     else if (!isFileValid(agentData.agentAuthorizationLetter)) {
      newErrors.agentAuthorizationLetter = "Invalid file format. Only JPG, JPEG, or PNG files are allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 function isFileValid(file){
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    message.error('Invalid file type. Please select an image file (JPEG, JPG, PNG, GIF).');
    return false;
  }
  else return true;
}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const url = URL.createObjectURL(file);
    setAgentAuthorizationLetterUrl(url);
    setAgentData((prevData) => ({
      ...prevData,
      agentAuthorizationLetter: file,
    }));

  };


  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const values = await form.validateFields();
  
        setAgentData((prevData) => ({
          ...prevData,
          ...values,
        }));
  
        const formData = new FormData();
        formData.append("agentBIN", agentData.agentBIN);
        formData.append("agentName", agentData.agentName);
        formData.append("agentEmail", agentData.agentEmail);
        formData.append("servicesOffered", agentData.servicesOffered);
        formData.append("phoneNumber", agentData.phoneNumber);
        formData.append("agentAuthorizationLetter", file);
  
        const response = await axios.post('http://localhost:3000/agents', formData);
        if (response.status === 200) {
          // Register admin activity
          const currentDate = new Date();
          const activity = {
            adminName: `Admin ${adminData.user.FirstName}`,
            action: 'registered',
            targetAdminName: `Agent ${agentData.agentName}`,
            timestamp: currentDate.toISOString(),
          };
  
          try {
            const activityResponse = await axios.post('http://localhost:3000/admin-activity', activity, {
              headers: {
                Authorization: adminData.token,
              },
            });
  
            if (activityResponse.status === 200) {
              console.log('Admin activity registered successfully!');
            } else {
              console.error('Error registering admin activity:', activityResponse);
            }
          } catch (error) {
            console.error('Error registering admin activity:', error);
          }
  
          form.resetFields();
          setFile(null);
          setAgentAuthorizationLetterUrl(null);
          console.log('Service provider registered successfully!');
          message.success('Agent registered successfully!');
        }
      } catch (error) {
        message.error('Error submitting form:');
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
            <Input name="agentName" onChange={handleChange} placeholder="Enter Agent's Name" />
          </Form.Item>

          <Form.Item
            label="Agent Email"
            name="agentEmail"
            validateStatus={errors.agentEmail && 'error'}
            help={errors.agentEmail}
            rules={[{ required: true }]}
          >
            <Input name="agentEmail" onChange={handleChange} placeholder="Enter Agent's Email address" />
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
            <Input name="phoneNumber" onChange={handleChange} placeholder="Enter Agent's Phonenumber" />
          </Form.Item>


          <Form.Item
            label="agentAuthorizationLetter"
            name="agentAuthorizationLetter"
            validateStatus={errors.agentAuthorizationLetter && 'error'}
            help={errors.agentAuthorizationLetter}
            rules={[{ required: true }]}
          >
            <Input
              type="file"
              name="agentAuthorizationLetter"
              id="agentAuthorizationLetter"
              accept=".jpeg, .jpg, .png, .gif"
              validateStatus={errors.agentAuthorizationLetter && 'error'}
              onChange={handleFileChange}
              help={errors.agentAuthorizationLetter}
              rules={[{ required: true }]}
              style={{width:'fit-content'}}
            />
            {agentAuthorizationLetterUrl && (
              <img src={agentAuthorizationLetterUrl} alt="Auth Letter" style={{ width: '200px' }} />
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>Register</Button>
          </Form.Item>
        </Form>
      </Layout.Content>
    } />
  );
};

export default AgentRegistrationForm;