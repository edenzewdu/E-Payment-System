import React, { useState, useEffect } from 'react';
import { Table, Input,Button } from 'antd';
import axios from 'axios';
import Dashboard from './Dashboard';

const UsersList = ({ isLoggedIn, setIsLoggedIn }) => {
  const [adminData, setAdminData] = useState(JSON.parse(localStorage.getItem('adminData')));
  const [userData, setUserData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(()=>{
    localStorage.setItem("selectedMenu", 8);
  },[])

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/Users');
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch users.', error);
    }
  };

  const handleSearch = (value) => {
    setSearchInput(value);
    const currentDate = new Date();
    const activity = {
      adminName: `Admin ${adminData.user.FirstName}`,
      action: 'Searched for',
      targetAdminName:`${value} in User List`,
      timestamp: currentDate.toISOString(),
    };

    // Get the existing admin activities from localStorage or initialize an empty array
    const adminActivities = JSON.parse(localStorage.getItem('adminActivities')) || [];

    // Add the new activity to the array
    adminActivities.push(activity);

    // Update the admin activities in localStorage
    localStorage.setItem('adminActivities', JSON.stringify(adminActivities));
  };

  const filteredUsers = userData.filter((user) =>
  user.Role === 'User' &&
  (user.UserName.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.FirstName.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.LastName.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.Email.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.Address.toLowerCase().includes(searchInput.toLowerCase()) ||
    (typeof user.PhoneNumber === 'string' &&
      user.PhoneNumber.toLowerCase().includes(searchInput.toLowerCase())))
);

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
    <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} content={
      <div>
        <h1>User List</h1>
        <Input.Search
          placeholder="Search User"
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
      </div>
    } />
  );
};

export default UsersList;