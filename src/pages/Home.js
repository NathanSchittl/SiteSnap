// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      price: '$29/month',
      features: [
        'Job & customer tracking',
        'Job calendar with checklists',
        'Before/after photo uploads',
        'Basic reporting (jobs/month, open vs completed)'
      ],
      color: 'primary'
    },
    {
      name: 'Team',
      price: '$59/month',
      features: [
        'All Starter features',
        'Multi-user access & role permissions',
        'Drag-and-drop job scheduling',
        'Internal notes/comments',
        'File/document uploads',
        'Pipeline tracking (lead stages)'
      ],
      color: 'success'
    },
    {
      name: 'Elite',
      price: '$119/month',
      features: [
        'All Team features',
        'Region/team management',
        'Workflow automation',
        'Advanced reporting (job speed, productivity)',
        'Priority onboarding & support'
      ],
      color: 'warning'
    }
  ];

  return (
    <div className="mt-4 text-center">
      <h1>Welcome to SiteSnap</h1>
      <p className="lead">Choose your plan and streamline your roofing projects.</p>
      <div className="row">
        {plans.map(plan => (
          <div className="col-md-4 mb-4" key={plan.name}>
            <div className={`card h-100 border-${plan.color}`}>
              <div className={`card-header bg-${plan.color} text-white`}>
                <h3 className="card-title">{plan.name}</h3>
              </div>
              <div className="card-body">
                <h4 className="card-subtitle mb-2">{plan.price}</h4>
                <ul className="list-unstyled mt-3 mb-4">
                  {plan.features.map((feat, idx) => (
                    <li key={idx}>• {feat}</li>
                  ))}
                </ul>
                <button
                  className={`btn btn-${plan.color}`}
                  onClick={() => navigate(`/signup?plan=${plan.name}`)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
