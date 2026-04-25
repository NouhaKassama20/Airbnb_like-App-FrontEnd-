// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';

// ── Chart Data ───────────────────────────────────────────────
const bookingsPerMonth = [
  { month: 'Jan', bookings: 18 },
  { month: 'Feb', bookings: 27 },
  { month: 'Mar', bookings: 35 },
  { month: 'Apr', bookings: 42 },
  { month: 'May', bookings: 61 },
  { month: 'Jun', bookings: 74 },
  { month: 'Jul', bookings: 95 },
  { month: 'Aug', bookings: 88 },
  { month: 'Sep', bookings: 52 },
  { month: 'Oct', bookings: 39 },
  { month: 'Nov', bookings: 28 },
  { month: 'Dec', bookings: 21 },
];

const revenuePerMonth = [
  { month: 'Jan', revenue: 84000 },
  { month: 'Feb', revenue: 120000 },
  { month: 'Mar', revenue: 158000 },
  { month: 'Apr', revenue: 193000 },
  { month: 'May', revenue: 271000 },
  { month: 'Jun', revenue: 340000 },
  { month: 'Jul', revenue: 428000 },
  { month: 'Aug', revenue: 395000 },
  { month: 'Sep', revenue: 234000 },
  { month: 'Oct', revenue: 175000 },
  { month: 'Nov', revenue: 126000 },
  { month: 'Dec', revenue: 98000 },
];

const listingsByWilaya = [
  { wilaya: 'Alger',       listings: 38 },
  { wilaya: 'Oran',        listings: 24 },
  { wilaya: 'Annaba',      listings: 18 },
  { wilaya: 'Tlemcen',     listings: 14 },
  { wilaya: 'Béjaïa',      listings: 12 },
  { wilaya: 'Tamanrasset', listings: 8  },
  { wilaya: 'Sétif',       listings: 6  },
];

const bookingStatusData = [
  { name: 'Confirmed', value: 68 },
  { name: 'Pending',   value: 18 },
  { name: 'Cancelled', value: 14 },
];

const propertyTypeData = [
  { name: 'Apartment', value: 52 },
  { name: 'Villa',     value: 28 },
  { name: 'House',     value: 20 },
];

const STATUS_COLORS = ['#c9a84c', '#1e3356', '#8a8070'];
const TYPE_COLORS   = ['#c9a84c', '#13213a', '#d4cfc4'];

const tooltipStyle = {
  backgroundColor: '#13213a',
  border: '1px solid rgba(201,168,76,0.3)',
  borderRadius: '10px',
  color: '#fff',
  fontSize: '13px',
};

// ── Reusable chart card ──────────────────────────────────────
function ChartCard({ title, children }) {
  return (
    <div style={{
      background: '#13213a',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px',
      padding: '24px',
    }}>
      <div style={{
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#c9a84c',
        marginBottom: '20px',
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
function AdminDashboard({ showToast }) {
  const [stats, setStats] = useState({ houses: 0, clients: 0, complaints: 0 });
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    const targets = { houses: 120, clients: 450, complaints: 12 };
    const steps = {
      houses:     targets.houses / 60,
      clients:    targets.clients / 60,
      complaints: targets.complaints / 60,
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
        houses:     Math.floor(current.houses),
        clients:    Math.floor(current.clients),
        complaints: Math.floor(current.complaints),
      });
      if (allDone) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const handleBanUser          = (type, id) => showToast(`🚫 Banned ${type} with ID ${id}`);
  const handleResolveComplaint = (id)       => showToast(`✅ Complaint ${id} resolved`);
  const handleApproveHost      = (id)       => showToast(`✅ Host ${id} approved`);
  const handleRejectHost       = (id)       => showToast(`❌ Host ${id} rejected`);

  return (
    <section className="admin-dashboard">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-sub">Manage hosts, guests, complaints, verification and transactions</p>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        {[
          ['stats',        'Statistics'],
          ['users',        'Users'],
          ['verification', 'Host Verification'],
          ['complaints',   'Complaints'],
          ['transactions', 'Transactions'],
          ['logs',         'Audit Logs'],
        ].map(([key, label]) => (
          <button
            key={key}
            className={`admin-tab ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="admin-content">

        {/* ── STATISTICS ── */}
        {activeTab === 'stats' && (
          <div>

            {/* Stat Cards */}
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

            {/* Row 1 — Line chart + Bar chart */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '36px' }}>

              <ChartCard title="Bookings per Month">
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={bookingsPerMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#c9a84c"
                      strokeWidth={2.5}
                      dot={{ fill: '#c9a84c', r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Revenue per Month (DZD)">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={revenuePerMonth} barSize={18}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={v => [`${v.toLocaleString()} DZD`, 'Revenue']}
                    />
                    <Bar dataKey="revenue" fill="#c9a84c" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

            </div>

            {/* Row 2 — Horizontal bar + 2 Donuts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginTop: '24px' }}>

              <ChartCard title="Listings by Wilaya">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={listingsByWilaya} layout="vertical" barSize={12}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      dataKey="wilaya"
                      type="category"
                      tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      width={85}
                    />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="listings" fill="#c9a84c" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Booking Status">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={bookingStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      outerRadius={75}
                      innerRadius={38}
                    >
                      {bookingStatusData.map((_, i) => (
                        <Cell key={i} fill={STATUS_COLORS[i % STATUS_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={v => (
                        <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>{v}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Property Types">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={propertyTypeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      outerRadius={75}
                      innerRadius={38}
                    >
                      {propertyTypeData.map((_, i) => (
                        <Cell key={i} fill={TYPE_COLORS[i % TYPE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={v => (
                        <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12 }}>{v}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

            </div>
          </div>
        )}

        {/* ── USERS ── */}
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

        {/* ── HOST VERIFICATION ── */}
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
                    <button className="reject-btn"  onClick={() => handleRejectHost(3)}>Reject</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ── COMPLAINTS ── */}
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

        {/* ── TRANSACTIONS ── */}
        {activeTab === 'transactions' && (
          <div className="admin-transactions">
            <h2>Transactions</h2>
            <table className="admin-table">
              <thead>
                <tr><th>ID</th><th>User</th><th>Amount</th><th>Method</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>201</td><td>Ali</td><td>5 000 DZD</td><td>Baridi Mob</td><td>Completed</td>
                </tr>
                <tr>
                  <td>202</td><td>Sara</td><td>3 500 DZD</td><td>CCP</td><td>Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ── AUDIT LOGS ── */}
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
