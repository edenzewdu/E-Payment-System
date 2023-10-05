import React, { useState } from 'react';
import Dashboard from './Dashboard';

const AdminActivityPage = () => {
  // Retrieve admin activities from localStorage
  const [adminData, setAdminData] = useState(JSON.parse(localStorage.getItem('adminData')))
  const adminActivities = JSON.parse(localStorage.getItem('adminActivities')) || [];
  const loggedInAdmin = `Admin ${adminData.user.FirstName}`;

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
                <li key={index} style={{ margin: '10px', width: '100%', textAlign: 'left' }}>
                  <p style={{ marginBottom: '5px', lineHeight: '1.5' }}>
                    <strong style={{ fontWeight: 'bold' }}>
                      Activity:
                    </strong>{' '}
                    <span
                      style={{
                        color: activity.adminName === loggedInAdmin ? 'blue' : 'green',
                      }}
                    >
                      {activity.adminName === loggedInAdmin ? 'You' : activity.adminName}
                    </span>{' '}
                    <span style={{
                        color: activity.adminName === loggedInAdmin ? 'blue' : 'green',
                      }}>registered</span>{' '}
                    <span style={{ color: 'purple' }}>{activity.targetAdminName}</span>{' '}
                    <span style={{
                        color: activity.adminName === loggedInAdmin ? 'blue' : 'green',
                      }}>at</span>{' '}
                    <span style={{ color: 'orange' }}>
                     {new Date(activity.timestamp).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </span>{' '}
                    <span style={{
                        color: activity.adminName === loggedInAdmin ? 'blue' : 'green',
                      }}>on</span>{' '}
                    <span style={{ color: 'teal' }}>
                     {new Date(activity.timestamp).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
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