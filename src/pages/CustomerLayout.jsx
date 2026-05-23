import { NavLink, Outlet } from 'react-router-dom';
import { HiChatAlt2, HiClipboardList, HiHome, HiStatusOnline } from 'react-icons/hi';
import './CustomerDashboard.css';

const NAV = [
  { to: '/customer', label: 'Dashboard', Icon: HiHome, end: true },
  { to: '/customer/progress', label: 'Progress', Icon: HiStatusOnline },
  { to: '/customer/chat', label: 'Chat', Icon: HiChatAlt2 },
  { to: '/customer/orders', label: 'Bookings', Icon: HiClipboardList },
];

export default function CustomerLayout() {
  return (
    <div className="customer-shell">
      <nav className="customer-tabs">
        {NAV.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `customer-tab ${isActive ? 'active' : ''}`}>
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
