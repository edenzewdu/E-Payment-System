import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app'; // Update the import statement
import 'firebase/compat/database'; // Update the import statement
import Dashboard from './Dashboard';
import { Layout } from 'antd';
import AdminRegistrationForm from './AdminRegistration';

const firebaseConfig = {
  apiKey: "AIzaSyB8mItXSr5tNsGnwwyXNX6T3dR_fs0KE1M",
  authDomain: "epayment-system.firebaseapp.com",
  projectId: "epayment-system",
  storageBucket: "epayment-system.appspot.com",
  messagingSenderId: "1047370312222",
  appId: "1:1047370312222:web:b7107d6bcb51fac60cdc0f",
  measurementId: "G-6FFTTEJHGC"
};

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    const activitiesRef = firebase.database().ref('activities');

    activitiesRef.on('value', (snapshot) => {
      const newActivities = snapshot.val();
      if (newActivities) {
        setActivities(Object.values(newActivities));
      } else {
        setActivities([]);
      }
    });

    return () => {
      activitiesRef.off('value');
    };
  }, []);

  const addActivity = (userId, description) => {
    const activitiesRef = firebase.database().ref(`activities/${userId}`);
    const newActivityRef = activitiesRef.push();
    newActivityRef.set({
      id: newActivityRef.key,
      description,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
  };

  return (
    <Layout>
      <Dashboard content={
        <div>
           <h1>Activities Page</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.description}</li>
        ))}
      </ul>
      </div>
    } />
    <AdminRegistrationForm addActivity={addActivity} />
    </Layout>
  );
};

export default ActivitiesPage;