import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { HiMail, HiLockClosed, HiArrowRight } from 'react-icons/hi';
import logo from '../../assets/logo.png';
import './Auth.css';

const DEMOS = [
  { label: 'Admin', email: 'admin@lovito.com', password: 'admin123', color: '#facc15' },
  { label: 'Editor', email: 'maya@lovito.com', password: 'editor123', color: '#d946ef' },
  { label: 'Customer', email: 'customer@lovito.com', password: 'customer123', color: '#22c55e' },
];

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(form.email, form.password);
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    if (result.role === 'admin') navigate('/admin');
    else if (result.role === 'worker') navigate('/editor');
    else navigate('/customer');
  };

  const fillDemo = (demo) => setForm({ email: demo.email, password: demo.password });

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-brand"><img src={logo} alt="Lovito" className="auth-logo-img" /> Lovito</Link>
        <h1>Welcome back</h1>
        <p className="auth-sub">Login to your Lovito workplace</p>

        <div className="demo-pills">
          {DEMOS.map(d => (
            <button key={d.label} className="demo-pill" style={{ borderColor: d.color, color: d.color }} onClick={() => fillDemo(d)}>
              Try {d.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <label>Email
            <div className="input-wrap">
              <HiMail className="input-icon" />
              <input type="email" placeholder="you@example.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
          </label>
          <label>Password
            <div className="input-wrap">
              <HiLockClosed className="input-icon" />
              <input type="password" placeholder="••••••••" value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
            </div>
          </label>
          {error && <div className="auth-error">⚠️ {error}</div>}
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Logging in...' : <><span>Login</span> <HiArrowRight style={{width:16,height:16}} /></>}
          </button>
        </form>

        <div className="login-details">
          <strong>Static demo logins</strong>
          <span>Admin: admin@lovito.com / admin123</span>
          <span>Editor: maya@lovito.com / editor123</span>
          <span>Customer: customer@lovito.com / customer123</span>
        </div>

        <p className="auth-switch">Don't have an account? <Link to="/register">Sign up</Link></p>
      </div>

      <div className="auth-visual">
        <div className="av-content">
          <div className="av-icon">LV</div>
          <h2>Editor bookings, files, revisions, and delivery in one premium workspace.</h2>
          <p>Explore customer, editor, and admin panels with the static accounts.</p>
          <div className="av-stats">
            <div><strong>320+</strong><span>Editors</span></div>
            <div><strong>12k</strong><span>Projects</span></div>
            <div><strong>4.9★</strong><span>Rating</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
