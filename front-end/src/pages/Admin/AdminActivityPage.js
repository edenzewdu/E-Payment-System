import React, { useState } from 'react';
import Dashboard from './Dashboard';

const AdminActivityPage = () => {
  // Retrieve admin activities from localStorage
  const [adminData, setAdminData] = useState(JSON.parse(localStorage.getItem('adminData')))
  const adminActivities = JSON.parse(localStorage.getItem('adminActivities')) || [];
  const loggedInAdmin = ( adminData.user.FirstName); // Replace with the actual logged-in admin name

  return (
    <Dashboard
      content={
        <div style={{ width: '100%' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
            Admin Activities
          </h1>
          {adminActivities.length > 0 ? (
            <ul style={{ padding: '10px', listStyle: 'none' }}>
              {adminActivities.map((activity, index) => (
                <li key={index} style={{ margin: '10px',width:'100%', textAlign:'left' }}>
                  <p style={{ marginBottom: '5px', lineHeight: '1.5' }}>
                    <strong style={{ fontWeight: 'bold' }}>
                      Activity:
                    </strong>{' '}
                    {`${activity.adminName === loggedInAdmin ? 'You' : ('Admin',activity.adminName)} ${
                      activity.action
                    } ${activity.targetAdminName} at ${new Date(
                      activity.timestamp
                    ).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                    })} on ${new Date(activity.timestamp).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}`}
                  </p>
                  <hr style={{ borderTop: '1px solid #ccc' }} />
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontStyle: 'italic' }}>No admin activities to display.</p>
          )}
        </div>
      }
    />
  );
};

export default AdminActivityPage;