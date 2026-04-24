// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';

function AdminDashboard({ showToast }) {
  const [stats, setStats] = useState({ houses: 0, clients: 0, complaints: 0 });
  const [activeTab, setActiveTab] = useState('stats');

  // Simulated counters
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

  const handleApproveHost = (id) => {
    showToast(`✅ Host ${id} approved`);
  };

  const handleRejectHost = (id) => {
    showToast(`❌ Host ${id} rejected`);
  };

  return (
    <section className="admin-dashboard">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-sub">Manage hosts, guests, complaints, verification and transactions</p>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button className={`admin-tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>Statistics</button>
        <button className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
        <button className={`admin-tab ${activeTab === 'verification' ? 'active' : ''}`} onClick={() => setActiveTab('verification')}>Host Verification</button>
        <button className={`admin-tab ${activeTab === 'complaints' ? 'active' : ''}`} onClick={() => setActiveTab('complaints')}>Complaints</button>
        <button className={`admin-tab ${activeTab === 'transactions' ? 'active' : ''}`} onClick={() => setActiveTab('transactions')}>Transactions</button>
        <button className={`admin-tab ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>Audit Logs</button>
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
                <tr><th>ID</th><th>Name</th><th>Role</th><th>Status</th><th>Actions</th></tr>
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

        {activeTab === 'verification' && (
          <div className="admin-verification">
            <h2>Host Verification</h2>
            <table className="admin-table">
              <thead>
                <tr><th>ID</th><th>Name</th><th>Document</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>3</td><td>Yasmine</td><td>CNIE.pdf</td><td>Pending</td>
                  <td>
                    <button className="approve-btn" onClick={() => handleApproveHost(3)}>Approve</button>
                    <button className="reject-btn" onClick={() => handleRejectHost(3)}>Reject</button>
                  </td>
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

        {activeTab === 'transactions' && (
          <div className="admin-transactions">
            <h2>Transactions</h2>
            <table className="admin-table">
              <thead>
                <tr><th>ID</th><th>User</th><th>Amount</th><th>Method</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>201</td><td>Ali</td><td>5000 DZD</td><td>Baridi Mob</td><td>Completed</td>
                </tr>
                <tr>
                  <td>202</td><td>Sara</td><td>3500 DZD</td><td>CCP</td><td>Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="admin-logs">
            <h2>Audit Logs</h2>
            <ul>
              <li>Admin banned Host #1 — 24/04/2026</li>
              <li>Admin resolved Complaint #101 — 24/04/2026</li>
              <li>Admin approved Host #3 — 24/04/2026</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;
