import { useEffect, useState } from 'react'
import { Plus, Search, Check, X, Trash2, Clock } from 'lucide-react'
import { appointmentStore } from '../data/store'
import type { Appointment } from '../data/types'
import '../AdminShared.css'

const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM',
]

const emptyForm = {
    clientName: '', clientEmail: '', clientPhone: '',
    date: '', time: '', service: '', stylist: '',
    status: 'pending' as const, notes: '', branch: 'Bengaluru',
}

export default function Appointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState(emptyForm)

    const reload = () => setAppointments(appointmentStore.getAll())
    useEffect(() => { reload() }, [])

    const filtered = appointments.filter(a => {
        const matchSearch = a.clientName.toLowerCase().includes(search.toLowerCase()) || a.service.toLowerCase().includes(search.toLowerCase())
        const matchStatus = statusFilter === 'all' || a.status === statusFilter
        return matchSearch && matchStatus
    }).sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time))

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        appointmentStore.create(form)
        setForm(emptyForm)
        setShowForm(false)
        reload()
    }

    const updateStatus = (id: string, status: Appointment['status']) => {
        appointmentStore.update(id, { status })
        reload()
    }

    const deleteApt = (id: string) => {
        if (confirm('Delete this appointment?')) {
            appointmentStore.delete(id)
            reload()
        }
    }

    return (
        <div>
            <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 className="admin-page-title">Appointments</h1>
                    <p className="admin-page-sub">Manage all bookings and appointment requests</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => setShowForm(!showForm)}>
                    <Plus size={14} />
                    New Appointment
                </button>
            </div>

            {/* New Appointment Form */}
            {showForm && (
                <div className="admin-form-card">
                    <h3>New Appointment</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="admin-form-grid">
                            <div className="admin-form-group">
                                <label className="admin-form-label">Client Name *</label>
                                <input className="admin-form-input" value={form.clientName} onChange={e => setForm({ ...form, clientName: e.target.value })} placeholder="Full name" required />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Email *</label>
                                <input className="admin-form-input" type="email" value={form.clientEmail} onChange={e => setForm({ ...form, clientEmail: e.target.value })} placeholder="email@example.com" required />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Phone</label>
                                <input className="admin-form-input" value={form.clientPhone} onChange={e => setForm({ ...form, clientPhone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Service *</label>
                                <input className="admin-form-input" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} placeholder="e.g. Balayage" required />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Date *</label>
                                <input className="admin-form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Time *</label>
                                <select className="admin-form-select" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required>
                                    <option value="">Select time</option>
                                    {timeSlots.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Stylist</label>
                                <input className="admin-form-input" value={form.stylist} onChange={e => setForm({ ...form, stylist: e.target.value })} placeholder="Assigned stylist" />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Branch</label>
                                <select className="admin-form-select" value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}>
                                    <option value="Bengaluru">Bengaluru</option>
                                    <option value="Kalaburagi">Kalaburagi</option>
                                </select>
                            </div>
                            <div className="admin-form-group full">
                                <label className="admin-form-label">Notes</label>
                                <textarea className="admin-form-textarea" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any special notes..." />
                            </div>
                        </div>
                        <div className="admin-form-actions">
                            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => { setShowForm(false); setForm(emptyForm) }}>Cancel</button>
                            <button type="submit" className="admin-btn admin-btn-primary">Create Appointment</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Filters */}
            <div className="admin-toolbar">
                <input className="admin-search" placeholder="Search by name or service..." value={search} onChange={e => setSearch(e.target.value)} />
                <select className="admin-filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Table */}
            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Service</th>
                            <th>Stylist</th>
                            <th>Branch</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={8}>
                                <div className="admin-empty" style={{ padding: 32 }}>
                                    <Search size={28} className="admin-empty-icon" />
                                    <h3>No appointments found</h3>
                                    <p>Try adjusting your filters</p>
                                </div>
                            </td></tr>
                        ) : filtered.map(apt => (
                            <tr key={apt.id}>
                                <td>
                                    <div style={{ fontWeight: 500, color: '#E8E8E8' }}>{apt.clientName}</div>
                                    <div style={{ fontSize: 11, color: '#666' }}>{apt.clientEmail}</div>
                                </td>
                                <td>{new Date(apt.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Clock size={12} />{apt.time}</span></td>
                                <td>{apt.service}</td>
                                <td>{apt.stylist || '—'}</td>
                                <td>{apt.branch}</td>
                                <td><span className={`status-badge ${apt.status}`}>{apt.status}</span></td>
                                <td>
                                    <div className="admin-actions">
                                        {apt.status === 'pending' && (
                                            <>
                                                <button className="admin-btn admin-btn-ghost admin-btn-sm" title="Confirm" onClick={() => updateStatus(apt.id, 'confirmed')}>
                                                    <Check size={14} style={{ color: '#4ADE80' }} />
                                                </button>
                                                <button className="admin-btn admin-btn-ghost admin-btn-sm" title="Cancel" onClick={() => updateStatus(apt.id, 'cancelled')}>
                                                    <X size={14} style={{ color: '#E85D5D' }} />
                                                </button>
                                            </>
                                        )}
                                        {apt.status === 'confirmed' && (
                                            <button className="admin-btn admin-btn-ghost admin-btn-sm" title="Mark Complete" onClick={() => updateStatus(apt.id, 'completed')}>
                                                <Check size={14} style={{ color: '#60A5FA' }} />
                                            </button>
                                        )}
                                        <button className="admin-btn admin-btn-ghost admin-btn-sm" title="Delete" onClick={() => deleteApt(apt.id)}>
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
