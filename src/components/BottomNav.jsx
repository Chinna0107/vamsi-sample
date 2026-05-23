import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useStore } from '../store/useStore';
import {
  HiHome, HiSparkles, HiClipboardList, HiUser,
  HiChartBar, HiCollection, HiUsers, HiSearch,
  HiCog, HiLocationMarker, HiLightningBolt,
} from 'react-icons/hi';
import './BottomNav.css';

const customerTabs = [
  { to: '/',       Icon: HiHome,          label: 'Home' },
  { to: '/browse', Icon: HiSparkles,      label: 'Editors' },
  { to: '/quick-editors', Icon: HiLightningBolt, label: 'Quick' },
  { to: '/customer', Icon: HiClipboardList, label: 'Projects' },
  { to: '/login',  Icon: HiUser,          label: 'Account' },
];

const adminTabs = [
  { to: '/admin',         Icon: HiChartBar,      label: 'Dashboard' },
  { to: '/admin/orders',  Icon: HiCollection,    label: 'Bookings' },
  { to: '/admin/workers', Icon: HiUsers,         label: 'Editors' },
  { to: '/browse',        Icon: HiSearch,        label: 'Find' },
];

const workerTabs = [
  { to: '/editor', Icon: HiCog, label: 'Panel' },
  { to: '/browse', Icon: HiSearch, label: 'Find' },
];

export default function BottomNav() {
  const location = useLocation();
  const user = useAuthStore(s => s.user);
  const activeOrder = useStore(s => s.activeOrder);

  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname === path || location.pathname.startsWith(path + '/');

  let tabs = customerTabs;
  if (user?.role === 'admin') tabs = adminTabs;
  else if (user?.role === 'worker') tabs = workerTabs;

  const resolvedTabs = tabs.map(t => {
    if (t.label === 'Account' && user)
      return { ...t, to: user.role === 'customer' ? '/customer' : '/', Icon: HiUser, label: user.name.split(' ')[0] };
    return t;
  });

  return (
    <nav className="bottom-nav">
      {resolvedTabs.map(({ to, Icon, label }) => (
        <Link key={to + label} to={to} className={`bn-tab ${isActive(to) ? 'active' : ''}`}>
          <Icon className="bn-icon" />
          <span className="bn-label">{label}</span>
          {isActive(to) && <span className="bn-dot" />}
        </Link>
      ))}

      {activeOrder && user?.role === 'customer' && (
        <Link
          to={`/track/${activeOrder.id}`}
          className={`bn-tab live ${isActive(`/track/${activeOrder.id}`) ? 'active' : ''}`}
        >
          <HiLocationMarker className="bn-icon" />
          <span className="bn-label">Live</span>
          <span className="live-ring" />
        </Link>
      )}
    </nav>
  );
}
