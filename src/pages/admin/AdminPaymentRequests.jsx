import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiCheckCircle, HiChevronLeft, HiClock, HiCurrencyRupee,
  HiDocumentText, HiExclamationCircle, HiUserCircle,
} from 'react-icons/hi';
import './Admin.css';

const REQUESTS = [
  { id: 'PR-1042', editor: 'Maya Stone', project: 'Product launch reel pack', amount: 5250, method: 'UPI', requested: 'Today, 10:40 AM', status: 'pending', risk: 'Clear' },
  { id: 'PR-1041', editor: 'Arjun Mehta', project: 'Podcast episode 18', amount: 3360, method: 'Bank transfer', requested: 'Today, 9:20 AM', status: 'review', risk: 'Invoice check' },
  { id: 'PR-1039', editor: 'Nora Quinn', project: 'Wedding teaser film', amount: 10500, method: 'Bank transfer', requested: 'Yesterday, 5:15 PM', status: 'approved', risk: 'Clear' },
  { id: 'PR-1038', editor: 'Dev Rao', project: 'Creator reel batch', amount: 2030, method: 'UPI', requested: 'Yesterday, 2:05 PM', status: 'paid', risk: 'Clear' },
];

const statusLabel = {
  pending: 'Pending',
  review: 'Review',
  approved: 'Approved',
  paid: 'Paid',
};

export default function AdminPaymentRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(REQUESTS);

  const totals = {
    pending: requests.filter(r => ['pending', 'review'].includes(r.status)).reduce((sum, r) => sum + r.amount, 0),
    approved: requests.filter(r => r.status === 'approved').reduce((sum, r) => sum + r.amount, 0),
    paid: requests.filter(r => r.status === 'paid').reduce((sum, r) => sum + r.amount, 0),
  };

  const markApproved = (id) => {
    setRequests(items => items.map(item => item.id === id ? { ...item, status: 'approved', risk: 'Clear' } : item));
  };

  const markPaid = (id) => {
    setRequests(items => items.map(item => item.id === id ? { ...item, status: 'paid' } : item));
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="ah-with-back">
          <button className="back-icon-btn" onClick={() => navigate('/admin/more')}><HiChevronLeft /></button>
          <div><h1>Editor Payment Requests</h1><p>Review, approve, and release editor payout requests professionally.</p></div>
        </div>
      </div>

      <div className="payout-summary">
        <article><HiClock /><span>Pending review</span><strong>₹{totals.pending.toLocaleString()}</strong></article>
        <article><HiCheckCircle /><span>Approved queue</span><strong>₹{totals.approved.toLocaleString()}</strong></article>
        <article><HiCurrencyRupee /><span>Paid this cycle</span><strong>₹{totals.paid.toLocaleString()}</strong></article>
      </div>

      <section className="admin-section payout-board">
        <div className="as-header">
          <h2>Payout Queue</h2>
          <button>Export CSV</button>
        </div>
        <div className="payout-list">
          {requests.map(request => (
            <article className="payout-request" key={request.id}>
              <div className="payout-editor">
                <HiUserCircle />
                <div>
                  <strong>{request.editor}</strong>
                  <span>{request.project}</span>
                </div>
              </div>
              <div className="payout-meta">
                <span><HiDocumentText /> {request.id}</span>
                <span>{request.method}</span>
                <span>{request.requested}</span>
              </div>
              <div className="payout-risk">
                <HiExclamationCircle />
                <span>{request.risk}</span>
              </div>
              <div className="payout-amount">₹{request.amount.toLocaleString()}</div>
              <span className={`payout-status ${request.status}`}>{statusLabel[request.status]}</span>
              <div className="payout-actions">
                {['pending', 'review'].includes(request.status) && (
                  <button onClick={() => markApproved(request.id)}>Approve</button>
                )}
                {request.status === 'approved' && (
                  <button onClick={() => markPaid(request.id)}>Mark Paid</button>
                )}
                {request.status === 'paid' && <span>Released</span>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
