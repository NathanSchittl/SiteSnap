// src/pages/Settings.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [email, setEmail] = useState(user ? user.email : '');
  const [plan, setPlan] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load user profile
    const fetchUser = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const data = userDoc.data();
      setPlan(data.plan || 'Starter');
    };
    fetchUser();
  }, [user]);

  const handlePlanChange = async (e) => {
    const newPlan = e.target.value;
    setPlan(newPlan);
    await updateDoc(doc(db, "users", user.uid), { plan: newPlan });
    setMessage('Plan updated.'); 
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <div>
      <h2>Settings</h2>
      <p><strong>Email:</strong> {email}</p>
      <div className="mb-3">
        <label>Subscription Plan</label>
        <select className="form-select w-25" value={plan} onChange={handlePlanChange}>
          <option>Starter</option>
          <option>Team</option>
          <option>Elite</option>
        </select>
        {message && <small className="text-success"> {message}</small>}
      </div>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Settings;
