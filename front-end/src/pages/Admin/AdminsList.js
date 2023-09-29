import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Form, Input, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const AdminsList = ({ isLoggedIn, setIsLoggedIn }) => {
  const [userData, setUserData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  //const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Users');
      setUserData(response.data);
    } catch (error) {
      message.error('Failed to fetch users.');
    }
  };



  const handleSearch = (value) => {
    setSearchInput(value);
  };

  const filteredUsers = userData.filter((user) =>
  user.Role === 'Admin' &&
  (user.UserName.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.FirstName.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.LastName.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.Email.toLowerCase().includes(searchInput.toLowerCase()) ||
    (typeof user.PhoneNumber === 'string' &&
      user.PhoneNumber.toLowerCase().includes(searchInput.toLowerCase())))
);

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
   
   
  ];

  return (
    <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} content={
      <div>
       <h1>Admin List</h1>
        <Input.Search
          placeholder="Search Admin"
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="id"
          scroll={{ x: true }}
        />
    
      </div>} />
  );
};

export default AdminsList;