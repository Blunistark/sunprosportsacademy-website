import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Users, TrendingUp, Clock, AlertTriangle, Package, FileText, ChevronRight } from 'lucide-react'
import { appointmentStore, clientStore, invoiceStore, inventoryStore, visitStore } from '../data/store'
import type { Appointment, Invoice } from '../data/types'
import '../AdminShared.css'

export default function Dashboard() {
    const navigate = useNavigate()
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const today = new Date().toISOString().split('T')[0]

    useEffect(() => { setAppointments(appointmentStore.getAll()) }, [])

    const clients = clientStore.getAll()
    const invoices = invoiceStore.getAll()
    const lowStock = inventoryStore.getLowStock()
    const visits = visitStore.getAll()

    const todayApts = appointments.filter(a => a.date === today)
    const pendingApts = appointments.filter(a => a.status === 'pending')
    const upcoming = appointments.filter(a => a.date >= today && (a.status === 'confirmed' || a.status === 'pending')).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)).slice(0, 6)

    // Revenue calculations
    const thisMonthInvoices = invoices.filter(i => i.status === 'paid' && i.date.startsWith(today.slice(0, 7)))
    const monthRevenue = thisMonthInvoices.reduce((s, i) => s + i.total, 0)
    const allPaidTotal = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0)

    // Top services by frequency
    const serviceCount: Record<string, number> = {}
    visits.forEach(v => v.services.forEach(s => { serviceCount[s.name] = (serviceCount[s.name] || 0) + 1 }))
    const topServices = Object.entries(serviceCount).sort((a, b) => b[1] - a[1]).slice(0, 5)

    // Recent invoices
    const recentInvoices = invoices.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)

    return (
        <div>
            <div className="admin-page-header">
                <h1 className="admin-page-title">Dashboard</h1>
                <p className="admin-page-sub">Overview of salon operations</p>
            </div>

            {/* Stats */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card" onClick={() => navigate('/admin/appointments')} style={{ cursor: 'pointer' }}>
                    <div className="stat-icon"><Calendar size={20} /></div>
                    <div className="stat-label">Today's Appointments</div>
                    <div className="stat-value accent">{todayApts.length}</div>
                </div>
                <div className="admin-stat-card" onClick={() => navigate('/admin/appointments')} style={{ cursor: 'pointer' }}>
                    <div className="stat-icon"><Clock size={20} /></div>
                    <div className="stat-label">Pending Requests</div>
                    <div className="stat-value" style={{ color: pendingApts.length > 0 ? '#FBBF24' : '#4ADE80' }}>{pendingApts.length}</div>
                </div>
                <div className="admin-stat-card" onClick={() => navigate('/admin/clients')} style={{ cursor: 'pointer' }}>
                    <div className="stat-icon"><Users size={20} /></div>
                    <div className="stat-label">Total Clients</div>
                    <div className="stat-value green">{clients.length}</div>
                </div>
                <div className="admin-stat-card" onClick={() => navigate('/admin/invoices')} style={{ cursor: 'pointer' }}>
                    <div className="stat-icon"><TrendingUp size={20} /></div>
                    <div className="stat-label">This Month Revenue</div>
                    <div className="stat-value accent">₹{monthRevenue.toLocaleString()}</div>
                </div>
            </div>

            {/* Alerts */}
            {(pendingApts.length > 0 || lowStock.length > 0) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {pendingApts.length > 0 && (
                        <div style={{ padding: '12px 18px', background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => navigate('/admin/appointments')}>
                            <Clock size={16} style={{ color: '#FBBF24', flexShrink: 0 }} />
                            <span style={{ fontSize: 13, color: '#CCC', flex: 1 }}>
                                <strong style={{ color: '#FBBF24' }}>{pendingApts.length} pending appointment{pendingApts.length > 1 ? 's' : ''}</strong> need{pendingApts.length === 1 ? 's' : ''} confirmation
                            </span>
                            <ChevronRight size={14} style={{ color: '#666' }} />
                        </div>
                    )}
                    {lowStock.length > 0 && (
                        <div style={{ padding: '12px 18px', background: 'rgba(232,93,93,0.06)', border: '1px solid rgba(232,93,93,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => navigate('/admin/inventory')}>
                            <AlertTriangle size={16} style={{ color: '#E85D5D', flexShrink: 0 }} />
                            <span style={{ fontSize: 13, color: '#CCC', flex: 1 }}>
                                <strong style={{ color: '#E85D5D' }}>{lowStock.length} product{lowStock.length > 1 ? 's' : ''}</strong> running low on stock
                            </span>
                            <ChevronRight size={14} style={{ color: '#666' }} />
                        </div>
                    )}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
                <div>
                    {/* Upcoming Appointments */}
                    <div className="admin-form-card" style={{ marginBottom: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 style={{ margin: 0, fontSize: 14 }}>Upcoming Appointments</h3>
                            <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => navigate('/admin/calendar')}>View Calendar →</button>
                        </div>
                        <div className="admin-table-wrapper" style={{ marginBottom: 0 }}>
                            <table className="admin-table">
                                <thead><tr><th>Date</th><th>Time</th><th>Client</th><th>Service</th><th>Branch</th><th>Status</th></tr></thead>
                                <tbody>
                                    {upcoming.length === 0 ? (
                                        <tr><td colSpan={6} style={{ textAlign: 'center', padding: 24, color: '#666' }}>No upcoming appointments</td></tr>
                                    ) : upcoming.map(apt => (
                                        <tr key={apt.id}>
                                            <td>{new Date(apt.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                                            <td>{apt.time}</td>
                                            <td style={{ fontWeight: 500, color: '#E8E8E8' }}>{apt.clientName}</td>
                                            <td>{apt.service}</td>
                                            <td>{apt.branch}</td>
                                            <td><span className={`status-badge ${apt.status}`}>{apt.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Invoices */}
                    <div className="admin-form-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 style={{ margin: 0, fontSize: 14 }}>Recent Invoices</h3>
                            <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => navigate('/admin/invoices')}>View All →</button>
                        </div>
                        <div className="admin-table-wrapper" style={{ marginBottom: 0 }}>
                            <table className="admin-table">
                                <thead><tr><th>Invoice</th><th>Client</th><th>Total</th><th>Status</th></tr></thead>
                                <tbody>
                                    {recentInvoices.map(inv => (
                                        <tr key={inv.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/invoices/${inv.id}`)}>
                                            <td style={{ color: '#C17F59', fontWeight: 500 }}>{inv.invoiceNumber}</td>
                                            <td>{inv.clientName}</td>
                                            <td style={{ fontWeight: 600 }}>₹{inv.total.toLocaleString()}</td>
                                            <td><span className={`status-badge ${inv.status === 'paid' ? 'confirmed' : inv.status === 'sent' ? 'pending' : inv.status}`}>{inv.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Quick Stats */}
                <div>
                    {/* Revenue Summary */}
                    <div className="admin-form-card" style={{ marginBottom: 20 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 14 }}>Revenue Summary</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#CCC' }}>
                                <span>This Month</span>
                                <span style={{ fontWeight: 600, color: '#4ADE80' }}>₹{monthRevenue.toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#CCC' }}>
                                <span>All Time</span>
                                <span style={{ fontWeight: 600, color: '#C17F59' }}>₹{allPaidTotal.toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#CCC' }}>
                                <span>Invoices (Paid)</span>
                                <span style={{ fontWeight: 500 }}>{invoices.filter(i => i.status === 'paid').length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Top Services */}
                    <div className="admin-form-card" style={{ marginBottom: 20 }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: 14 }}>Popular Services</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {topServices.map(([name, count], i) => (
                                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(193,127,89,0.15)', color: '#C17F59', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, flexShrink: 0 }}>{i + 1}</span>
                                    <span style={{ flex: 1, fontSize: 12, color: '#CCC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</span>
                                    <span style={{ fontSize: 11, color: '#888', flexShrink: 0 }}>{count}x</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Low Stock */}
                    {lowStock.length > 0 && (
                        <div className="admin-form-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 12px' }}>
                                <Package size={14} style={{ color: '#E85D5D' }} />
                                <h3 style={{ margin: 0, fontSize: 14, color: '#E85D5D' }}>Low Stock</h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {lowStock.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                                        <span style={{ color: '#CCC' }}>{item.name}</span>
                                        <span style={{ color: '#E85D5D', fontWeight: 600 }}>{item.currentStock} left</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
