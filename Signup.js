// src/pages/Signup.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const defaultPlan = params.get('plan') || 'Starter'; // default to Starter
  const [plan, setPlan] = useState(defaultPlan);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setPlan(defaultPlan);
  }, [defaultPlan]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      // Save user profile with plan to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        plan: plan,
        createdAt: serverTimestamp()
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Sign Up</h2>
        <p>Selected Plan: <strong>{plan}</strong></p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email" className="form-control"
              value={email} onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password" className="form-control"
              value={password} onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Optionally allow plan change on signup form */}
          <div className="mb-3">
            <label>Plan</label>
            <select className="form-select" value={plan} onChange={e => setPlan(e.target.value)}>
              <option>Starter</option>
              <option>Team</option>
              <option>Elite</option>
            </select>
          </div>
          <button className="btn btn-primary">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
