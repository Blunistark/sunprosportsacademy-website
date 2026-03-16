import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus, Search, FileText, ArrowLeft, Printer, Eye, Trash2 } from 'lucide-react'
import { invoiceStore, clientStore, serviceStore } from '../data/store'
import type { Invoice, InvoiceItem } from '../data/types'
import '../AdminShared.css'

// ─── Invoice Detail View ────────────────────────────────────
function InvoiceDetail() {
    const { invoiceId } = useParams<{ invoiceId: string }>()
    const navigate = useNavigate()
    const [invoice, setInvoice] = useState<Invoice | null>(null)

    useEffect(() => {
        if (invoiceId) { setInvoice(invoiceStore.getById(invoiceId) || null) }
    }, [invoiceId])

    if (!invoice) {
        return <div className="admin-empty" style={{ padding: 60 }}>
            <h3>Invoice not found</h3>
            <button className="admin-btn admin-btn-primary" onClick={() => navigate('/admin/invoices')}>Back</button>
        </div>
    }

    const handlePrint = () => { window.print() }

    const updateStatus = (status: Invoice['status']) => {
        invoiceStore.update(invoice.id, { status })
        setInvoice({ ...invoice, status })
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                <button className="admin-btn admin-btn-ghost" onClick={() => navigate('/admin/invoices')}>
                    <ArrowLeft size={18} />
                </button>
                <div style={{ flex: 1 }}>
                    <h1 className="admin-page-title" style={{ marginBottom: 0 }}>{invoice.invoiceNumber}</h1>
                    <p className="admin-page-sub">Invoice for {invoice.clientName}</p>
                </div>
                <span className={`status-badge ${invoice.status === 'paid' ? 'confirmed' : invoice.status === 'sent' ? 'pending' : invoice.status}`}>{invoice.status}</span>
                <button className="admin-btn admin-btn-secondary" onClick={handlePrint}><Printer size={14} /> Print</button>
            </div>

            {/* Invoice Card */}
            <div className="admin-form-card" id="invoice-print">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
                    <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#C17F59', letterSpacing: 2 }}>CM</div>
                        <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>Christalin Mirrors</div>
                        <div style={{ fontSize: 11, color: '#666' }}>{invoice.branch}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 18, fontWeight: 600, color: '#E8E8E8' }}>{invoice.invoiceNumber}</div>
                        <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Date: {new Date(invoice.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                        {invoice.stylist && <div style={{ fontSize: 12, color: '#666' }}>Stylist: {invoice.stylist}</div>}
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, padding: '14px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                    <div>
                        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', color: '#666', marginBottom: 4 }}>Bill To</div>
                        <div style={{ fontWeight: 500, color: '#E8E8E8' }}>{invoice.clientName}</div>
                        <div style={{ fontSize: 12, color: '#888' }}>{invoice.clientEmail}</div>
                        {invoice.clientPhone && <div style={{ fontSize: 12, color: '#888' }}>{invoice.clientPhone}</div>}
                    </div>
                    {invoice.paymentMethod && (
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', color: '#666', marginBottom: 4 }}>Payment</div>
                            <div style={{ fontSize: 13, color: '#CCC', textTransform: 'uppercase' }}>{invoice.paymentMethod}</div>
                        </div>
                    )}
                </div>

                {/* Items Table */}
                <table className="admin-table" style={{ marginBottom: 20 }}>
                    <thead>
                        <tr><th>Service</th><th style={{ textAlign: 'right' }}>Qty</th><th style={{ textAlign: 'right' }}>Unit Price</th><th style={{ textAlign: 'right' }}>Total</th></tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, i) => (
                            <tr key={i}>
                                <td>
                                    <div style={{ fontWeight: 500, color: '#E8E8E8' }}>{item.service}</div>
                                    {item.description && <div style={{ fontSize: 11, color: '#666' }}>{item.description}</div>}
                                </td>
                                <td style={{ textAlign: 'right' }}>{item.quantity}</td>
                                <td style={{ textAlign: 'right' }}>₹{item.unitPrice.toLocaleString()}</td>
                                <td style={{ textAlign: 'right', fontWeight: 500 }}>₹{item.total.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: 280 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, color: '#CCC' }}>
                            <span>Subtotal</span><span>₹{invoice.subtotal.toLocaleString()}</span>
                        </div>
                        {invoice.discountAmount > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, color: '#4ADE80' }}>
                                <span>Discount ({invoice.discountPercent}%)</span><span>-₹{invoice.discountAmount.toLocaleString()}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13, color: '#888' }}>
                            <span>GST ({invoice.taxPercent}%)</span><span>₹{invoice.taxAmount.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: 18, fontWeight: 700, color: '#C17F59', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 4 }}>
                            <span>Total</span><span>₹{invoice.total.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 12, color: '#888' }}>
                            <span>Amount Paid</span><span>₹{invoice.amountPaid.toLocaleString()}</span>
                        </div>
                        {invoice.total - invoice.amountPaid > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13, fontWeight: 600, color: '#E85D5D' }}>
                                <span>Balance Due</span><span>₹{(invoice.total - invoice.amountPaid).toLocaleString()}</span>
                            </div>
                        )}
                    </div>
                </div>

                {invoice.notes && (
                    <div style={{ marginTop: 20, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 6, fontSize: 12, color: '#888' }}>
                        <strong>Notes:</strong> {invoice.notes}
                    </div>
                )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                {invoice.status === 'draft' && <button className="admin-btn admin-btn-primary" onClick={() => updateStatus('sent')}>Mark as Sent</button>}
                {(invoice.status === 'sent' || invoice.status === 'overdue') && <button className="admin-btn admin-btn-primary" onClick={() => updateStatus('paid')}>Mark as Paid</button>}
                {invoice.status !== 'cancelled' && invoice.status !== 'paid' && <button className="admin-btn admin-btn-danger" onClick={() => updateStatus('cancelled')}>Cancel Invoice</button>}
            </div>
        </div>
    )
}

// ─── Invoice List ───────────────────────────────────────────
function InvoiceList() {
    const navigate = useNavigate()
    const [invoices, setInvoices] = useState<Invoice[]>([])
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [showForm, setShowForm] = useState(false)
    const [items, setItems] = useState<InvoiceItem[]>([{ service: '', quantity: 1, unitPrice: 0, total: 0 }])
    const [formData, setFormData] = useState({ clientId: '', discountPercent: 0, taxPercent: 18, paymentMethod: 'cash' as Invoice['paymentMethod'], branch: 'Bengaluru', stylist: '', notes: '' })

    const reload = () => setInvoices(invoiceStore.getAll())
    useEffect(() => { reload() }, [])

    const clients = clientStore.getAll()
    const services = serviceStore.getAll()

    const filtered = invoices.filter(inv => {
        const matchSearch = inv.clientName.toLowerCase().includes(search.toLowerCase()) || inv.invoiceNumber.toLowerCase().includes(search.toLowerCase())
        const matchStatus = statusFilter === 'all' || inv.status === statusFilter
        return matchSearch && matchStatus
    }).sort((a, b) => b.date.localeCompare(a.date))

    const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0)
    const outstanding = invoices.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((s, i) => s + (i.total - i.amountPaid), 0)

    const updateItem = (idx: number, field: keyof InvoiceItem, value: string | number) => {
        const updated = [...items]
        updated[idx] = { ...updated[idx], [field]: value }
        if (field === 'service') {
            const svc = services.find(s => s.name === value)
            if (svc) { updated[idx].unitPrice = svc.price; updated[idx].total = svc.price * updated[idx].quantity }
        }
        if (field === 'quantity' || field === 'unitPrice') {
            updated[idx].total = updated[idx].unitPrice * updated[idx].quantity
        }
        setItems(updated)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const client = clients.find(c => c.id === formData.clientId)
        if (!client || items.length === 0) return
        const subtotal = items.reduce((s, i) => s + i.total, 0)
        const discountAmount = Math.round(subtotal * formData.discountPercent / 100)
        const taxable = subtotal - discountAmount
        const taxAmount = Math.round(taxable * formData.taxPercent / 100)
        const total = taxable + taxAmount

        invoiceStore.create({
            invoiceNumber: invoiceStore.getNextInvoiceNumber(),
            clientId: client.id, clientName: client.name, clientEmail: client.email, clientPhone: client.phone,
            date: new Date().toISOString().split('T')[0], items, subtotal,
            discountPercent: formData.discountPercent, discountAmount,
            taxPercent: formData.taxPercent, taxAmount, total, amountPaid: 0,
            status: 'draft', paymentMethod: formData.paymentMethod,
            branch: formData.branch, stylist: formData.stylist, notes: formData.notes,
        })
        setShowForm(false)
        setItems([{ service: '', quantity: 1, unitPrice: 0, total: 0 }])
        setFormData({ clientId: '', discountPercent: 0, taxPercent: 18, paymentMethod: 'cash', branch: 'Bengaluru', stylist: '', notes: '' })
        reload()
    }

    const deleteInv = (id: string) => { if (confirm('Delete this invoice?')) { invoiceStore.delete(id); reload() } }

    return (
        <div>
            <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 className="admin-page-title">Invoices</h1>
                    <p className="admin-page-sub">Generate and manage client invoices</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => setShowForm(!showForm)}>
                    <Plus size={14} /> New Invoice
                </button>
            </div>

            {/* Stats */}
            <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="admin-stat-card"><div className="stat-label">Total Invoices</div><div className="stat-value">{invoices.length}</div></div>
                <div className="admin-stat-card"><div className="stat-label">Revenue (Paid)</div><div className="stat-value green">₹{totalRevenue.toLocaleString()}</div></div>
                <div className="admin-stat-card"><div className="stat-label">Outstanding</div><div className="stat-value" style={{ color: outstanding > 0 ? '#FBBF24' : '#4ADE80' }}>₹{outstanding.toLocaleString()}</div></div>
            </div>

            {/* Create Invoice Form */}
            {showForm && (
                <div className="admin-form-card">
                    <h3>Create Invoice</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="admin-form-grid">
                            <div className="admin-form-group">
                                <label className="admin-form-label">Client *</label>
                                <select className="admin-form-select" value={formData.clientId} onChange={e => setFormData({ ...formData, clientId: e.target.value })} required>
                                    <option value="">Select client</option>
                                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Branch</label>
                                <select className="admin-form-select" value={formData.branch} onChange={e => setFormData({ ...formData, branch: e.target.value })}>
                                    <option value="Bengaluru">Bengaluru</option><option value="Kalaburagi">Kalaburagi</option>
                                </select>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Stylist</label>
                                <input className="admin-form-input" value={formData.stylist} onChange={e => setFormData({ ...formData, stylist: e.target.value })} />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Payment Method</label>
                                <select className="admin-form-select" value={formData.paymentMethod} onChange={e => setFormData({ ...formData, paymentMethod: e.target.value as Invoice['paymentMethod'] })}>
                                    <option value="cash">Cash</option><option value="card">Card</option><option value="upi">UPI</option><option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Line Items */}
                        <div style={{ marginTop: 20 }}>
                            <div className="admin-form-label" style={{ marginBottom: 10 }}>Services</div>
                            {items.map((item, idx) => (
                                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                                    <select className="admin-form-select" value={item.service} onChange={e => updateItem(idx, 'service', e.target.value)} required>
                                        <option value="">Select service</option>
                                        {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                                    </select>
                                    <input className="admin-form-input" type="number" min={1} value={item.quantity} onChange={e => updateItem(idx, 'quantity', parseInt(e.target.value) || 1)} />
                                    <input className="admin-form-input" type="number" value={item.unitPrice} onChange={e => updateItem(idx, 'unitPrice', parseInt(e.target.value) || 0)} />
                                    <div style={{ fontWeight: 500, color: '#C17F59', fontSize: 13 }}>₹{item.total.toLocaleString()}</div>
                                    {items.length > 1 && <button type="button" className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => setItems(items.filter((_, i) => i !== idx))}>×</button>}
                                </div>
                            ))}
                            <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setItems([...items, { service: '', quantity: 1, unitPrice: 0, total: 0 }])}>+ Add Item</button>
                        </div>

                        <div className="admin-form-grid" style={{ marginTop: 16 }}>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Discount (%)</label>
                                <input className="admin-form-input" type="number" min={0} max={100} value={formData.discountPercent} onChange={e => setFormData({ ...formData, discountPercent: parseInt(e.target.value) || 0 })} />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">GST (%)</label>
                                <input className="admin-form-input" type="number" min={0} value={formData.taxPercent} onChange={e => setFormData({ ...formData, taxPercent: parseInt(e.target.value) || 0 })} />
                            </div>
                            <div className="admin-form-group full">
                                <label className="admin-form-label">Notes</label>
                                <textarea className="admin-form-textarea" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                            </div>
                        </div>
                        <div className="admin-form-actions">
                            <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                            <button type="submit" className="admin-btn admin-btn-primary">Create Invoice</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Filters */}
            <div className="admin-toolbar">
                <input className="admin-search" placeholder="Search invoices..." value={search} onChange={e => setSearch(e.target.value)} />
                <select className="admin-filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option><option value="sent">Sent</option><option value="paid">Paid</option><option value="overdue">Overdue</option><option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Table */}
            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr><th>Invoice #</th><th>Client</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={7}><div className="admin-empty" style={{ padding: 32 }}><FileText size={28} className="admin-empty-icon" /><h3>No invoices found</h3></div></td></tr>
                        ) : filtered.map(inv => (
                            <tr key={inv.id}>
                                <td style={{ fontWeight: 500, color: '#C17F59' }}>{inv.invoiceNumber}</td>
                                <td>
                                    <div style={{ fontWeight: 500, color: '#E8E8E8' }}>{inv.clientName}</div>
                                    <div style={{ fontSize: 11, color: '#666' }}>{inv.clientEmail}</div>
                                </td>
                                <td>{new Date(inv.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                                <td style={{ fontSize: 12 }}>{inv.items.length} item{inv.items.length > 1 ? 's' : ''}</td>
                                <td style={{ fontWeight: 600 }}>₹{inv.total.toLocaleString()}</td>
                                <td><span className={`status-badge ${inv.status === 'paid' ? 'confirmed' : inv.status === 'sent' ? 'pending' : inv.status}`}>{inv.status}</span></td>
                                <td>
                                    <div className="admin-actions">
                                        <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => navigate(`/admin/invoices/${inv.id}`)}><Eye size={14} /></button>
                                        <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => deleteInv(inv.id)}><Trash2 size={14} /></button>
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

// ─── Export Router Switch ────────────────────────────────────
export { InvoiceList, InvoiceDetail }
