import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';

const API = 'http://localhost:5000/api/admin'

const STATUS_COLORS = ['#c9a84c', '#1e3356', '#8a8070'];
const TYPE_COLORS   = ['#c9a84c', '#13213a', '#d4cfc4'];

const tooltipStyle = {
  backgroundColor: '#13213a',
  border: '1px solid rgba(201,168,76,0.3)',
  borderRadius: '10px',
  color: '#fff',
  fontSize: '13px',
};

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

function AdminDashboard({ showToast }) {
  const [activeTab, setActiveTab]           = useState('stats')
  const [loading,   setLoading]             = useState(true)
  const [error,     setError]               = useState(null)

  const [stats,            setStats]            = useState({ houses: 0, clients: 0, complaints: 0 })
  const [bookingsPerMonth, setBookingsPerMonth]  = useState([])
  const [revenuePerMonth,  setRevenuePerMonth]   = useState([])
  const [listingsByWilaya, setListingsByWilaya]  = useState([])
  const [bookingStatusData,setBookingStatusData] = useState([])
  const [users,            setUsers]             = useState([])
  const [complaints,       setComplaints]        = useState([])
  const [transactions,     setTransactions]      = useState([])

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      setError(null)
      try {
        const [
          statsRes,
          bookingsRes,
          revenueRes,
          wilayaRes,
          statusRes,
          usersRes,
          complaintsRes,
          transactionsRes,
        ] = await Promise.all([
          fetch(`${API}/stats`),
          fetch(`${API}/bookings-per-month`),
          fetch(`${API}/revenue-per-month`),
          fetch(`${API}/listings-by-wilaya`),
          fetch(`${API}/booking-status`),
          fetch(`${API}/users`),
          fetch(`${API}/complaints`),
          fetch(`${API}/transactions`),
        ])

        const statsData        = await statsRes.json()
        const bookingsData     = await bookingsRes.json()
        const revenueData      = await revenueRes.json()
        const wilayaData       = await wilayaRes.json()
        const statusData       = await statusRes.json()
        const usersData        = await usersRes.json()
        const complaintsData   = await complaintsRes.json()
        const transactionsData = await transactionsRes.json()

        // Debug logs — check DevTools Console
        console.log('stats',        statsData)
        console.log('bookings',     bookingsData)
        console.log('revenue',      revenueData)
        console.log('wilaya',       wilayaData)
        console.log('status',       statusData)
        console.log('users',        usersData)
        console.log('complaints',   complaintsData)
        console.log('transactions', transactionsData)

        setStats(
          statsData?.houses !== undefined
            ? statsData
            : { houses: 0, clients: 0, complaints: 0 }
        )
        setBookingsPerMonth( Array.isArray(bookingsData)     ? bookingsData     : [])
        setRevenuePerMonth(  Array.isArray(revenueData)      ? revenueData      : [])
        setListingsByWilaya( Array.isArray(wilayaData)       ? wilayaData       : [])
        setBookingStatusData(Array.isArray(statusData)       ? statusData       : [])
        setUsers(            Array.isArray(usersData)        ? usersData        : [])
        setComplaints(       Array.isArray(complaintsData)   ? complaintsData   : [])
        setTransactions(     Array.isArray(transactionsData) ? transactionsData : [])

      } catch (err) {
        console.error('fetchAll error:', err)
        setError('Failed to connect to the server. Make sure your backend is running on port 5000.')
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  const handleBanUser = async (id, name) => {
    try {
      await fetch(`${API}/users/${id}`, { method: 'DELETE' })
      setUsers(prev => prev.filter(u => u.user_id !== id))
      showToast(`🚫 ${name} has been banned`)
    } catch (err) {
      console.error('Ban error:', err)
      showToast('❌ Failed to ban user')
    }
  }

  const handleResolveComplaint = async (id) => {
    try {
      await fetch(`${API}/complaints/${id}/resolve`, { method: 'PATCH' })
      setComplaints(prev =>
        prev.map(c => c.complaint_id === id ? { ...c, status: 'resolved' } : c)
      )
      showToast('✅ Complaint resolved')
    } catch (err) {
      console.error('Resolve error:', err)
      showToast('❌ Failed to resolve complaint')
    }
  }

  // ── Loading state ──
  if (loading) return (
    <div style={{
      color: '#c9a84c',
      padding: '60px',
      textAlign: 'center',
      fontSize: '18px'
    }}>
      Loading dashboard...
    </div>
  )

  // ── Error state ──
  if (error) return (
    <div style={{
      color: '#ff6b6b',
      padding: '60px',
      textAlign: 'center',
      fontSize: '16px',
      background: '#13213a',
      borderRadius: '16px',
      margin: '40px',
    }}>
      <div style={{ fontSize: '32px', marginBottom: '16px' }}>⚠️</div>
      {error}
    </div>
  )

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
          ['complaints',   'Complaints'],
          ['transactions', 'Transactions'],
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

      <div className="admin-content">

        {/* ── STATISTICS ── */}
        {activeTab === 'stats' && (
          <div>

            {/* Stat Cards */}
            <div className="admin-stats">
              <div className="stat-card">
                <div className="stat-num">{stats.houses}</div>
                <div className="stat-label">Properties Listed</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{stats.clients}</div>
                <div className="stat-label">Guests Registered</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">{stats.complaints}</div>
                <div className="stat-label">Complaints</div>
              </div>
            </div>

            {/* Row 1 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              marginTop: '36px'
            }}>
              <ChartCard title="Bookings per Month">
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={bookingsPerMonth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
                      axisLine={false} tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
                      axisLine={false} tickLine={false}
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
                      axisLine={false} tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
                      axisLine={false} tickLine={false}
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

            {/* Row 2 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              marginTop: '24px'
            }}>
              <ChartCard title="Listings by Wilaya">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={listingsByWilaya} layout="vertical" barSize={12}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                    <XAxis
                      type="number"
                      tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
                      axisLine={false} tickLine={false}
                    />
                    <YAxis
                      dataKey="wilaya"
                      type="category"
                      tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 11 }}
                      axisLine={false} tickLine={false}
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
            </div>

          </div>
        )}

        {/* ── USERS ── */}
        {activeTab === 'users' && (
          <div className="admin-users">
            <h2>Manage Users</h2>
            {users.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>No users found.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Wilaya</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.user_id}>
                      <td>{u.full_name}</td>
                      <td>{u.email}</td>
                      <td>{u.wilaya}</td>
                      <td>{u.role}</td>
                      <td>{new Date(u.created_at).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => handleBanUser(u.user_id, u.full_name)}>
                          Ban
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── COMPLAINTS ── */}
        {activeTab === 'complaints' && (
          <div className="admin-complaints">
            <h2>Complaints</h2>
            {complaints.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>No complaints found.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>Against</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map(c => (
                    <tr key={c.complaint_id}>
                      <td>{c.guest?.user?.full_name || '—'}</td>
                      <td>{c.target?.full_name      || '—'}</td>
                      <td>{c.description}</td>
                      <td>{c.status}</td>
                      <td>{new Date(c.created_at).toLocaleDateString()}</td>
                      <td>
                        {c.status !== 'resolved' && (
                          <button onClick={() => handleResolveComplaint(c.complaint_id)}>
                            Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── TRANSACTIONS ── */}
        {activeTab === 'transactions' && (
          <div className="admin-transactions">
            <h2>Transactions</h2>
            {transactions.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>No transactions found.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(t => (
                    <tr key={t.payment_id}>
                      <td>{t.guest?.user?.full_name || '—'}</td>
                      <td>{t.total_price.toLocaleString()} DZD</td>
                      <td>{t.pay_method}</td>
                      <td>{t.status}</td>
                      <td>{new Date(t.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

export default AdminDashboard;