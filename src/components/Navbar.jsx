import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import logo from '../assets/logo.png';
import {
  HiChevronDown, HiChevronUp, HiClipboardList, HiLogout,
  HiViewGrid,
} from 'react-icons/hi';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Homepage', to: '/' },
  { label: 'Find Editors', to: '/browse' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Support', to: '/support' },
];

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef();

  useEffect(() => {
    const handler = (e) => { if (!dropRef.current?.contains(e.target)) setDropOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLink = (to) => {
    if (to.includes('#')) {
      const [path, id] = to.split('#');
      if (window.location.pathname !== path) navigate(path);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80);
      return;
    }
    navigate(to);
  };

  const handleLogout = () => { logout(); navigate('/'); setDropOpen(false); };
  const panelPath = user?.role === 'admin' ? '/admin' : user?.role === 'worker' ? '/editor' : '/customer';

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <img src={logo} alt="Lovito" className="brand-logo-img" />
          <span>Lovito</span>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map(item => (
            <button key={item.label} onClick={() => handleLink(item.to)}>{item.label}</button>
          ))}
        </div>

        <div className="nav-right">
          <button className="contact-link" onClick={() => handleLink('/contact')}>Contact</button>
          {!user && (
            <Link to="/login" className="btn-nav-primary">Signin</Link>
          )}

          {user && (
            <div className="user-menu" ref={dropRef}>
              <button className="avatar-btn" onClick={() => setDropOpen(o => !o)}>
                <span className="avatar-circle">{user.name.charAt(0).toUpperCase()}</span>
                <span className="avatar-name">{user.name.split(' ')[0]}</span>
                {dropOpen ? <HiChevronUp className="chevron-icon" /> : <HiChevronDown className="chevron-icon" />}
              </button>
              {dropOpen && (
                <div className="dropdown">
                  <div className="drop-header">
                    <strong>{user.name}</strong>
                    <span className={`role-tag ${user.role}`}>{user.role === 'worker' ? 'editor' : user.role}</span>
                  </div>
                  <div className="drop-email">{user.email}</div>
                  <hr />
                  <Link to={panelPath} className="drop-item" onClick={() => setDropOpen(false)}>
                    {user.role === 'customer' ? <HiClipboardList className="drop-icon" /> : <HiViewGrid className="drop-icon" />}
                    {user.role === 'admin' ? 'Admin Panel' : user.role === 'worker' ? 'Editor Panel' : 'Customer Dashboard'}
                  </Link>
                  <button className="drop-item logout" onClick={handleLogout}>
                    <HiLogout className="drop-icon" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
