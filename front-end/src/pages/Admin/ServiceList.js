import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Form, Input } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import Dashboard from './Dashboard';

const ServiceProvidersList = ({ isLoggedIn, setIsLoggedIn }) => {
  const [serviceProviderData, setServiceProviderData] = useState([]);
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [serviceProvider, setServiceProvider] = useState(null);
  const [serviceProviderAuthorizationLetterUrl, setServiceProviderAuthorizationLetterUrl] = useState();
  const [selectedMenu, setSelectedMenu] = useState(['5']);

  useEffect(() => {
    localStorage.setItem("selectedMenu", selectedMenu);
    fetchServiceProviders();
  }, [selectedMenu]);
  

  const fetchServiceProviders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/serviceProviders');
      setServiceProviderData(response.data);
    } catch (error) {
      message.error('Failed to fetch service providers.');
    }
  };

  const handleEdit = (serviceProvider) => {
    form.setFieldsValue(serviceProvider);
    setEditMode(true);
    setServiceProvider(serviceProvider);
  };

  const handleSave = () => {
    Modal.confirm({
      title: 'Confirm Edit',
      content: 'Are you sure you want to edit this service provider?',
      okText: 'Edit',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        form.validateFields().then((values) => {
          const updatedServiceProvider = { ...values };
          axios
            .put(
              `http://localhost:3000/serviceProviders/${updatedServiceProvider.serviceProviderBIN}`,
              updatedServiceProvider
            )
            .then((response) => {
              if (response.status === 200) {
                message.success('Service provider data updated successfully.');
                window.location.href = window.location.href;
                const updatedData = serviceProviderData.map((sp) =>
                  sp.serviceProviderBIN === updatedServiceProvider.serviceProviderBIN
                    ? updatedServiceProvider
                    : sp
                );
                setServiceProviderData(updatedData);
                setEditMode(false);
                form.resetFields();
              } else {
                message.error('Failed to update service provider data.');
              }
            })
            .catch((error) => {
              message.error('Failed to update service provider data.');
            });
        });
      },
    });
  };

  const handleDelete = (serviceProviderBIN) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this service provider?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        axios
          .delete(`http://localhost:3000/serviceProviders/${serviceProviderBIN}`)
          .then((response) => {
            if (response.status === 200) {
              message.success('Service provider deleted successfully.');
              window.location.href = window.location.href;
              const updatedData = serviceProviderData.filter(
                (sp) => sp.serviceProviderBIN !== serviceProviderBIN
              );
              setServiceProviderData(updatedData);
            } else {
              message.error('Failed to delete service provider.');
            }
          })
          .catch((error) => {
            message.error('Failed to delete service provider.');
          });
      },
    });
  };

  const columns = [
    {
      title: 'Service Provider BIN',
      dataIndex: 'serviceProviderBIN',
      key: 'serviceProviderBIN',
    },
    {
      title: 'Service Provider Name',
      dataIndex: 'serviceProviderName',
      key: 'serviceProviderName',
    },
    {
      title: 'Services Offered',
      dataIndex: 'servicesOffered',
      key: 'servicesOffered',
    },
    {
      title: 'Bank Name',
      dataIndex: 'BankName',
      key: 'BankName',
    },
    {
      title: 'Bank Account Number',
      dataIndex: 'BankAccountNumber',
      key: 'BankAccountNumber',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Authorization Letter',
      dataIndex: 'serviceProviderAuthorizationLetter',
      key: 'serviceProviderAuthorizationLetter',
      render: (_, serviceProvider) => (
        <div>
          {serviceProvider.serviceProviderAuthorizationLetter && (
            <div>
              <a href={`http://localhost:3000/${serviceProvider.serviceProviderAuthorizationLetter}`} download>
                Authorization Letter
              </a>
              <Button
                type="primary"
                onClick={() => {
                  const downloadLink = document.createElement('a');
                  downloadLink.href = `http://localhost:3000/${serviceProvider.serviceProviderAuthorizationLetter}`;
                  downloadLink.download = 'Authorization Letter';
                  downloadLink.target = '_blank';
                  downloadLink.click();
                }}
              >
                Download
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, serviceProvider) => (
        <div>
          <Button onClick={() => handleEdit(serviceProvider)} icon={<EditOutlined />} type="danger">
            Edit
          </Button>
          <Button onClick={() => handleDelete(serviceProvider.serviceProviderBIN)} icon={<DeleteOutlined />} type="danger">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Dashboard selectedMenu={selectedMenu} content={
      <div>
        <h1>Service Providers List</h1>
        <Table dataSource={serviceProviderData} columns={columns} scroll={{ x: true }} />
        <Modal
          title={editMode ? 'Edit Service Provider' : 'Create Service Provider'}
          visible={editMode}
          onCancel={() => {
            setEditMode(false);
            form.resetFields();
          }}
          footer={null}
        >
          <Form form={form}>
            <Form.Item name="serviceProviderBIN" label="Service Provider BIN">
              <Input />
            </Form.Item>
            <Form.Item name="serviceProviderName" label="Service Provider Name">
              <Input />
            </Form.Item>
            <Form.Item name="servicesOffered" label="Services Offered">
              <Input />
            </Form.Item>
            <Form.Item name="BankName" label="Bank Name">
              <Input />
            </Form.Item>
            <Form.Item name="BankAccountNumber" label="Bank Account Number">
              <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="Phone Number">
              <Input />
            </Form.Item>
            <Form.Item >
          <label htmlFor="serviceProviderAuthorizationLetter">Authorization Letter:</label>
              <input
                type="file"
                id="serviceProvider"
                accept=".jpeg, .jpg, .png, .gif"
              />
              {serviceProviderAuthorizationLetterUrl && (
                <img src={serviceProviderAuthorizationLetterUrl} alt="Auth Letter" style={{ width: '200px' }} />
              )}
          </Form.Item>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </Form>
        </Modal>
      </div>}
    />
  );
};

export default ServiceProvidersList;