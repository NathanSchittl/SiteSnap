// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, collection, getDocs, query } from 'firebase/firestore';

function Dashboard() {
  const user = auth.currentUser;
  const [plan, setPlan] = useState('');
  const [stats, setStats] = useState({ total: 0, open: 0, completed: 0 });

  useEffect(() => {
    const fetchUserAndJobs = async () => {
      if (user) {
        // Get user profile to know plan
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        setPlan(userData.plan || 'Starter');
        // Fetch jobs
        const jobsCol = collection(db, "users", user.uid, "jobs");
        const jobsSnapshot = await getDocs(query(jobsCol));
        const jobs = jobsSnapshot.docs.map(doc => doc.data());
        const total = jobs.length;
        const open = jobs.filter(j => j.status !== 'Completed').length;
        setStats({ total, open, completed: total - open });
      }
    };
    fetchUserAndJobs();
  }, [user]);

  // Display features based on plan
  const features = {
    Starter: ['Job tracking', 'Calendar & checklists', 'Photo uploads', 'Basic reports'],
    Team: ['Multi-user access', 'Role permissions', 'Drag-drop scheduling', 'Notes & file uploads', 'Lead pipeline'],
    Elite: ['Regional teams', 'Workflow automation', 'Advanced reports', 'Priority onboarding']
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, <strong>{user.email}</strong>! You are on the <strong>{plan}</strong> plan.</p>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Jobs</h5>
              <p className="card-text" style={{ fontSize: '2rem' }}>{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Open Jobs</h5>
              <p className="card-text" style={{ fontSize: '2rem' }}>{stats.open}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Completed Jobs</h5>
              <p className="card-text" style={{ fontSize: '2rem' }}>{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>
      <h4>Your Plan Features:</h4>
      <ul>
        {features[plan].map((feat, idx) => <li key={idx}>{feat}</li>)}
      </ul>
      {(plan === 'Starter') && (
        <div className="alert alert-secondary">
          Upgrade to Team or Elite for multi-user access and advanced features!
        </div>
      )}
    </div>
  );
}

export default Dashboard;
