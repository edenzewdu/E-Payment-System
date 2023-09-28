import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Form, Input, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const AdminsList = ({ isLoggedIn, setIsLoggedIn }) => {
  const [userData, setUserData] = useState([]);
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(['7']);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedMenu", selectedMenu);
    fetchUsers();
  }, [selectedMenu]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Users');
      setUserData(response.data);
    } catch (error) {
      message.error('Failed to fetch users.');
    }
  };

  const handleEdit = (user) => {
    form.setFieldsValue(user);
    setEditMode(true);
    setUser(user);
  };

  const handleSave = () => {
    Modal.confirm({
      title: 'Confirm Edit',
      content: 'Are you sure you want to edit this user?',
      okText: 'Edit',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        // Get form values
        form.validateFields().then((values) => {
          const updatedUser = { ...values, id: user.id };
  
          // Create FormData object
          const formData = new FormData();
          formData.append('ProfilePicture', values.ProfilePicture[0]); // Assuming only one file is selected
  
          // Update user data
          axios
            .put(`http://localhost:3000/Users/${updatedUser.id}`, updatedUser)
            .then((response) => {
              if (response.status === 200) {
                // Upload file separately
                axios
                  .put(`http://localhost:3000/Users/${updatedUser.id}`, formData)
                  .then((uploadResponse) => {
                    if (uploadResponse.status === 200) {
                      message.success('User data and file updated successfully.');
                      const updatedData = userData.map((user) =>
                        user.id === updatedUser.id ? updatedUser : user
                      );
                      setUserData(updatedData);
                      setEditMode(false);
                      form.resetFields();
                    } else {
                      message.error('Failed to upload file.');
                    }
                  })
                  .catch((error) => {
                    message.error('Failed to upload file.');
                  });
              } else {
                message.error('Failed to update user data.');
              }
            })
            .catch((error) => {
              message.error('Failed to update user data.');
            });
        });
      },
    });
  };

  const handleDelete = (userId) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this user?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        axios
          .delete(`http://localhost:3000/Users/${userId}`)
          .then((response) => {
            if (response.status === 200) {
              message.success('User deleted successfully.');
              const updatedData = userData.filter((user) => user.id !== userId);
              setUserData(updatedData);
            } else {
              message.error('Failed to delete user.');
            }
          })
          .catch((error) => {
            message.error('Failed to delete user.');
          });
      },
    });
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'FirstName',
      key: 'FirstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'LastName',
      key: 'LastName',
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
    },
    {
      title: 'User Name',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'PhoneNumber',
      key: 'PhoneNumber',
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
    },
    {
      title: 'Role',
      dataIndex: 'Role',
      key: 'Role',
    },
    {
      title: 'Profile Image',
      dataIndex: 'ProfilePicture',
      key: 'ProfilePicture',
      render: (_, user) => (
        <div>
          {user.ProfilePicture && (
            <div>
              <a href={`http://localhost:3000/${user.ProfilePicture}`} download>
                Profile picture
              </a>
              <Button
                type="primary"
                onClick={() => {
                  const downloadLink = document.createElement('a');
                  downloadLink.href = `http://localhost:3000/${user.ProfilePicture}`;
                  downloadLink.download = 'Profile picture';
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
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, user) => (
        <div>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(user)}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(user.id)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Dashboard selectedMenu={selectedMenu} content={
      <div>
        <Table dataSource={userData.filter(user => user.Role === 'Admin')} columns={columns} rowKey="id" scroll={{ x: true }} />
        <Modal
          title="Edit User"
          visible={editMode}
          onCancel={() => {
            setEditMode(false);
            form.resetFields();
          }}
          onOk={handleSave}
        >
          <Form form={form}>
            <Form.Item name="UserID" label="UserID">
              <Input />
            </Form.Item>
            <Form.Item name="FirstName" label="First Name">
              <Input />
            </Form.Item>
            <Form.Item name="LastName" label="Last Name">
              <Input />
            </Form.Item>
            <Form.Item name="Gender" label="Gender">
              <Input />
            </Form.Item>
            <Form.Item name="UserName" label="User Name">
              <Input />
            </Form.Item>
            <Form.Item name="Email" label="Email">
              <Input type="email" />
            </Form.Item>
            <Form.Item name="PhoneNumber" label="Phone Number">
              <Input type="tel" />
            </Form.Item>
            <Form.Item name="Address" label="Address">
              <Input />
            </Form.Item>
            <Form.Item name="Role" label="Role">
              <Input />
            </Form.Item>
            <Form.Item name="ProfilePicture" label="Profile Picture">
              <Upload accept=".jpeg, .jpg, .png, .gif" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </Form>
        </Modal>
      </div>} />
  );
};

export default AdminsList;