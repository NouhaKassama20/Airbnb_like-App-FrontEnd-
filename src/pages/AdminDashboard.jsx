// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';


function AdminDashboard({ showToast }) {
  const [stats, setStats] = useState({ houses: 0, clients: 0, complaints: 0 });
  const [activeTab, setActiveTab] = useState('stats');

  // Example: simulate counters like HomePage
  useEffect(() => {
    const targets = { houses: 120, clients: 450, complaints: 12 };
    const steps = {
      houses: targets.houses / 60,
      clients: targets.clients / 60,
      complaints: targets.complaints / 60
    };
    let current = { houses: 0, clients: 0, complaints: 0 };
    const interval = setInterval(() => {
      let allDone = true;
      for (let key of ['houses', 'clients', 'complaints']) {
        if (current[key] < targets[key]) {
          allDone = false;
          current[key] = Math.min(current[key] + steps[key], targets[key]);
        }
      }
      setStats({
        houses: Math.floor(current.houses),
        clients: Math.floor(current.clients),
        complaints: Math.floor(current.complaints)
      });
      if (allDone) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  // Example actions
  const handleBanUser = (type, id) => {
    showToast(`🚫 Banned ${type} with ID ${id}`);
  };

  const handleResolveComplaint = (id) => {
    showToast(`✅ Complaint ${id} resolved`);
  };

  return (
    <section className="admin-dashboard">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-sub">Manage hosts, guests, complaints and platform stats</p>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >Statistics</button>
        <button
          className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >Users</button>
        <button
          className={`admin-tab ${activeTab === 'complaints' ? 'active' : ''}`}
          onClick={() => setActiveTab('complaints')}
        >Complaints</button>
      </div>

      {/* Content */}
      <div className="admin-content">
        {activeTab === 'stats' && (
          <div className="admin-stats">
            <div className="stat-card">
              <div className="stat-num">{stats.houses}</div>
              <div className="stat-label">Houses Rented</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{stats.clients}</div>
              <div className="stat-label">Clients Registered</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">{stats.complaints}</div>
              <div className="stat-label">Complaints</div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-users">
            <h2>Manage Users</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Role</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td><td>Ali</td><td>Host</td><td>Active</td>
                  <td><button onClick={() => handleBanUser('host', 1)}>Ban</button></td>
                </tr>
                <tr>
                  <td>2</td><td>Sara</td><td>Guest</td><td>Active</td>
                  <td><button onClick={() => handleBanUser('guest', 2)}>Ban</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'complaints' && (
          <div className="admin-complaints">
            <h2>Complaints</h2>
            <ul>
              <li>
                Complaint #101 — Host canceled last minute
                <button onClick={() => handleResolveComplaint(101)}>Resolve</button>
              </li>
              <li>
                Complaint #102 — Guest damaged property
                <button onClick={() => handleResolveComplaint(102)}>Resolve</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;
