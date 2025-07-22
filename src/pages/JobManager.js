// src/pages/JobManager.js
import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import {
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp, query
} from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // For photo uploads

function JobManager() {
  const user = auth.currentUser;
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Open');
  const [error, setError] = useState('');

  // Fetch jobs from Firestore
  const fetchJobs = async () => {
    if (user) {
      const jobsCol = collection(db, "users", user.uid, "jobs");
      const jobsSnapshot = await getDocs(query(jobsCol));
      const jobsList = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobsList);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [user]);

  // Add a new job
  const handleAddJob = async (e) => {
    e.preventDefault();
    setError('');
    if (!title) return;
    try {
      await addDoc(collection(db, "users", user.uid, "jobs"), {
        title,
        status,
        createdAt: serverTimestamp()
      });
      setTitle('');
      setStatus('Open');
      fetchJobs();
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle job status between Open and Completed
  const toggleStatus = async (job) => {
    const jobRef = doc(db, "users", user.uid, "jobs", job.id);
    await updateDoc(jobRef, {
      status: job.status === 'Completed' ? 'Open' : 'Completed'
    });
    fetchJobs();
  };

  // Delete a job
  const deleteJob = async (jobId) => {
    await deleteDoc(doc(db, "users", user.uid, "jobs", jobId));
    fetchJobs();
  };

  return (
    <div>
      <h2>Job Manager</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {/* Add Job Form */}
      <form onSubmit={handleAddJob} className="mb-4">
        <div className="row g-2 align-items-center">
          <div className="col-md-5">
            <input
              type="text" className="form-control"
              placeholder="Job Title" value={title}
              onChange={e => setTitle(e.target.value)} required
            />
          </div>
          <div className="col-md-3">
            <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
              <option>Open</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100">Add Job</button>
          </div>
        </div>
      </form>
      {/* Jobs Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.status}</td>
              <td>
                <button
                  className={`btn btn-sm me-2 ${job.status === 'Completed' ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => toggleStatus(job)}
                >
                  {job.status === 'Completed' ? 'Reopen' : 'Complete'}
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteJob(job.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {jobs.length === 0 && (
            <tr>
              <td colSpan="3">No jobs added yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default JobManager;
