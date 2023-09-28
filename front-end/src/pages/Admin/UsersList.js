import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Form, Input, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const UsersList = () => {
  const [userData, setUserData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(['8']);
  const navigate = useNavigate();

  useEffect(() => {
      localStorage.setItem("selectedMenu", 8);
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



  const columns = [
    {
        title: 'User ID',
        dataIndex: 'UserID',
        key: 'UserID',
      },
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
  ];

  return (
    <Dashboard selectedMenu={selectedMenu} content={
      <div>
        <Table dataSource={userData} columns={columns} rowKey="id" scroll={{ x: true }} />
      </div>} />
  );
};

export default UsersList;