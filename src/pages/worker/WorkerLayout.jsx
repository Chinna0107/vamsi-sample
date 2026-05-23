import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { HiChatAlt2, HiHome, HiClipboardList, HiClock, HiCurrencyRupee, HiUser } from 'react-icons/hi';
import logo from '../../assets/logo.png';
import './Worker.css';

export default function WorkerLayout() {
  const user = useAuthStore(s => s.user);
  const { pathname } = useLocation();
  const base = pathname.startsWith('/editor') ? '/editor' : '/worker';
  if (!user) return null;

  const NAV = [
    { to: base, icon: HiHome, label: 'Dashboard' },
    { to: `${base}/orders`, icon: HiClipboardList, label: 'Projects' },
    { to: `${base}/history`, icon: HiClock, label: 'Uploads' },
    { to: `${base}/wallet`, icon: HiCurrencyRupee, label: 'Earnings' },
    { to: `${base}/chat`, icon: HiChatAlt2, label: 'Chat' },
    { to: `${base}/profile`, icon: HiUser, label: 'Portfolio' },
  ];

  return (
    <div className="worker-layout">
      <header className="worker-top-header">
        <div className="wth-brand">
          <img src={logo} alt="Lovito" className="wth-logo-img" />
          <span>Lovito</span>
          <span className="wth-badge">Editor</span>
        </div>
        <nav className="worker-top-nav">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === base}
              className={({ isActive }) => `wtn-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="wtn-icon" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="wth-user">
          <div className="wth-avatar">{user.name.charAt(0)}</div>
          <div className="wth-info">
            <strong>{user.name.split(' ')[0]}</strong>
            <span className={`wth-status ${user.available ? 'online' : 'offline'}`}>
              {user.available ? '● Online' : '○ Offline'}
            </span>
          </div>
        </div>
      </header>
      <div className="worker-content">
        <Outlet />
      </div>
      <nav className="worker-mobile-nav">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === base}
            className={({ isActive }) => `wmn-item ${isActive ? 'active' : ''}`}
          >
            <Icon className="wmn-icon" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
