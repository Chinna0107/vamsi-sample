import { useNavigate } from 'react-router-dom';
import { HiBell, HiChartBar, HiCurrencyRupee, HiChevronRight, HiCube } from 'react-icons/hi';
import './Admin.css';

const MORE_ITEMS = [
  { to: '/admin/products', icon: HiCube,          label: 'Services',  desc: 'Manage editor service listings', color: '#3b82f6' },
  { to: '/admin/reports',  icon: HiChartBar,       label: 'Booking Reports', desc: 'Analytics & performance data', color: '#8b5cf6' },
  { to: '/admin/payments', icon: HiCurrencyRupee,  label: 'Payments',  desc: 'Revenue & transaction history', color: '#10b981' },
  { to: '/admin/payment-requests', icon: HiCurrencyRupee, label: 'Editor Payment Requests', desc: 'Approve and release editor payouts', color: '#14b8a6' },
  { to: '/admin/notifications', icon: HiBell, label: 'Notifications', desc: 'Send updates to customers or editors', color: '#d946ef' },
];

export default function AdminMore() {
  const navigate = useNavigate();
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div><h1>Admin Tools</h1><p>Reports, services, payments, and notification controls</p></div>
      </div>
      <div className="more-list">
        {MORE_ITEMS.map(({ to, icon: Icon, label, desc, color }) => (
          <button key={to} className="more-item" onClick={() => navigate(to)}>
            <div className="mi-icon-wrap" style={{ background: color + '18', color }}>
              <Icon className="mi-icon" />
            </div>
            <div className="mi-text">
              <strong>{label}</strong>
              <span>{desc}</span>
            </div>
            <HiChevronRight className="mi-arrow" />
          </button>
        ))}
      </div>
      <div className="admin-section" style={{ marginTop: 18 }}>
        <div className="as-header"><h2>Notification Templates</h2></div>
        <div className="recent-orders-list">
          <div className="ro-item"><div><div className="ro-vehicle">Customer update</div><div className="ro-meta">Your editor uploaded a new review version.</div></div><span className="status-chip active">customer</span></div>
          <div className="ro-item"><div><div className="ro-vehicle">Editor update</div><div className="ro-meta">A new booking request is waiting for acceptance.</div></div><span className="status-chip assigned">editor</span></div>
          <div className="ro-item"><div><div className="ro-vehicle">Admin broadcast</div><div className="ro-meta">Payment, revision, or delivery reminders can target either group.</div></div><span className="status-chip pending">both</span></div>
        </div>
      </div>
    </div>
  );
}
