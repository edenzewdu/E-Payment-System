import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Modal, Select, Spin, Table, message } from 'antd';
import Dashboard from './Dashboard';



const ServiceNumberGeneration = () => {

    const [form] = Form.useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [userList, setUserList] = useState([]);
    const [formData, setFormData] = useState({
        UserID: '',
        serviceProviderBINs: '',
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [adminData, setAdminData] = useState(JSON.parse(localStorage.getItem('adminData')));


    useEffect(() => {
        // Check if adminData exists
        if (!adminData) {
            setTimeout(() => {
                navigate('/admin/login');
                message.error('Please login to access the dashboard');
            }, 5000);
        } else {
            setIsLoading(false);
        }
        localStorage.setItem('selectedMenu', 10);
    }, [adminData, navigate]);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
                <p>Please wait while we check your login status...</p>
            </div>
        );
    }

    const validateForm = async () => {
        try {
            await form.validateFields();
            return true;
        } catch (error) {
            const newErrors = {};
            error.errorFields.forEach((field) => {
                newErrors[field.name[0]] = field.errors[0];
            });
            setErrors(newErrors);
            return false;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        if (await validateForm()) {
            try {
                const formDataToSend = new FormData();
                formDataToSend.append('UserID', formData.UserID);
                formDataToSend.append('serviceProviderBINs', formData.serviceProviderBINs);

                const response = await axios.post('http://localhost:3000/Users/associate', formDataToSend);
                const responseData = response.data;

                if (response.status === 200) {
                    setModalVisible(true);
                    setModalContent(responseData.user);
                    const activity = {
                        adminName: `Admin ${adminData.user.FirstName}`,
                        action: '',
                        targetAdminName: ``,
                        timestamp: new Date().getTime(),
                    };

                    // Save the admin activity to the database
                    axios.post('http://localhost:3000/admin-activity', activity, {
                        headers: {
                            Authorization: adminData.token,
                        },
                    });
                } else {
                    console.log('Error:', responseData.message);
                    message.error('Error:', responseData.message);
                }
            } catch (error) {
                console.error('Error associating user with service providers:', error);
                message.error('Error associating user with service providers:', error);
            }
        };
    };
    
    const columns = [
        {
          title: 'User ID',
          dataIndex: 'UserID',
          key: 'UserID',
        },
        {
          title: 'Service No',
          dataIndex: 'serviceNo',
          key: 'serviceNo',
          render: (text, record) => (
            <span>
              {record.serviceProviders.map((provider) => (
                <div key={provider.serviceNo}>{provider.serviceNo}</div>
              ))}
            </span>
          ),
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text, record) => (
            <span>
              {record.serviceProviders.map((provider) => (
                <div key={provider.serviceNo}>{provider.name}</div>
              ))}
            </span>
          ),
        },
      ];
      

    const handleListUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/Users');
            const responseData = response.data;

            if (response.status === 200) {
                const modifiedData = responseData.map((user) => {
                  const serviceProviders = user.ServiceProviders.map((serviceProvider) => ({
                    serviceNo: serviceProvider.userServiceProvider.serviceNo || '',
                    name: serviceProvider.serviceProviderName || ''
                  }));
              
                  return {
                    ...user,
                    serviceProviders
                  };
                });
              
                setUserList(modifiedData);
              } else {
                console.log('Error:', responseData.message);
                message.error('Error:', responseData.message);
            }
        } catch (error) {
            console.error('Error listing users:', error);
        }
    };

    return (
        <Dashboard content={
            <div>

                <Form form={form} layout="vertical" onFinish={handleSubmit} >
                    <h1>Service Number Generation</h1>
                    <Form.Item label="User ID" name="UserID" rules={[{ required: true, message: 'Please enter the User ID' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Service Provider BINs (comma-separated)"
                        name="serviceProviderBINs"
                        rules={[{ required: true, message: 'Please enter the Service Provider BINs' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Generate
                    </Button>
                </Form>

                <br />
                <br />
                <Button onClick={handleListUsers}>List Users</Button>

                <Modal
                    title="Associated User"
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                >
                    {modalContent && (
                        <div>
                            <p>User ID: {modalContent.UserID}</p>
                            <p>Service No: {modalContent.serviceNo}</p>
                            <p>Name: {modalContent.FirstName + ' ' + modalContent.LastName}</p>
                        </div>
                    )}
                </Modal>

                <Table dataSource={userList} columns={columns} />

            </div>} />
    );
};
export default ServiceNumberGeneration;