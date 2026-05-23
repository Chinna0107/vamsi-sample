import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiBell, HiChevronLeft, HiClipboardCheck, HiPaperAirplane,
  HiSparkles, HiUsers,
} from 'react-icons/hi';
import './Admin.css';

const templates = [
  { title: 'Version uploaded', audience: 'Customers', text: 'Your editor uploaded a new review version. Open progress to approve or request changes.' },
  { title: 'Booking waiting', audience: 'Editors', text: 'A new booking request is waiting for your confirmation.' },
  { title: 'Payment reminder', audience: 'Customers', text: 'Your payment confirmation is pending for the active project.' },
  { title: 'Payout approved', audience: 'Editors', text: 'Your payment request has been approved and is queued for release.' },
];

const activity = [
  ['Sent', 'Customer update sent to Rhea Kapoor', '2 min ago'],
  ['Queued', 'Payout reminder queued for Maya Stone', '18 min ago'],
  ['Draft', 'Weekend delivery broadcast saved', '1 hr ago'],
];

export default function AdminNotifications() {
  const navigate = useNavigate();
  const [audience, setAudience] = useState('customers');
  const [message, setMessage] = useState('Your editor uploaded a new version. Please review the progress page.');

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="ah-with-back">
          <button className="back-icon-btn" onClick={() => navigate('/admin/more')}><HiChevronLeft /></button>
          <div><h1>Notifications Center</h1><p>Create targeted updates for customers, editors, or all platform users.</p></div>
        </div>
      </div>

      <div className="notification-layout">
        <section className="admin-section notification-composer">
          <div className="as-header">
            <h2>Compose Notification</h2>
            <HiBell className="composer-icon" />
          </div>
          <div className="audience-tabs">
            {[
              ['customers', 'Customers'],
              ['editors', 'Editors'],
              ['all', 'All Users'],
            ].map(([id, label]) => (
              <button key={id} className={audience === id ? 'active' : ''} onClick={() => setAudience(id)}>
                <HiUsers /> {label}
              </button>
            ))}
          </div>
          <label className="admin-field">
            <span>Title</span>
            <input defaultValue="Project update available" />
          </label>
          <label className="admin-field">
            <span>Message</span>
            <textarea rows={6} value={message} onChange={e => setMessage(e.target.value)} />
          </label>
          <div className="notification-preview">
            <HiSparkles />
            <div>
              <strong>Preview</strong>
              <p>{message}</p>
            </div>
          </div>
          <button className="send-notification"><HiPaperAirplane /> Send Notification</button>
        </section>

        <section className="admin-section">
          <div className="as-header"><h2>Templates</h2></div>
          <div className="template-list">
            {templates.map(template => (
              <button key={template.title} onClick={() => setMessage(template.text)}>
                <HiClipboardCheck />
                <span>
                  <strong>{template.title}</strong>
                  <small>{template.audience}</small>
                  <p>{template.text}</p>
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="admin-section notification-activity">
        <div className="as-header"><h2>Recent Notification Activity</h2></div>
        {activity.map(([status, title, time]) => (
          <div className="activity-row" key={title}>
            <span className={`activity-status ${status.toLowerCase()}`}>{status}</span>
            <strong>{title}</strong>
            <small>{time}</small>
          </div>
        ))}
      </section>
    </div>
  );
}
