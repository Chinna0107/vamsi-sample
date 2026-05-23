import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import {
  HiMail, HiLockClosed, HiUser, HiPhone, HiArrowRight,
  HiIdentification, HiBriefcase,
} from 'react-icons/hi';
import { MdEngineering } from 'react-icons/md';
import logo from '../../assets/logo.png';
import './Auth.css';

const VEHICLE_TYPES = [
  'Social video editor', 'YouTube editor', 'Podcast editor', 'Brand film editor',
  'Wedding film editor', 'Performance ad editor', 'Motion graphics editor',
  'Colorist', 'Sound editor', 'VFX cleanup editor', 'Other',
];

const EXPERIENCE_OPTIONS = ['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'];

export default function Register() {
  const [role, setRole] = useState(''); // 'customer' | 'worker'
  const [step, setStep] = useState(0);  // 0: role, 1: form, 2: worker details, 3: otp
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [workerForm, setWorkerForm] = useState({ vehicleType: '', licenseNo: '', experience: '', aadhar: '', address: '' });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const f = (key) => ({ value: form[key], onChange: e => setForm(p => ({ ...p, [key]: e.target.value })) });
  const w = (key) => ({ value: workerForm[key], onChange: e => setWorkerForm(p => ({ ...p, [key]: e.target.value })) });

  const handleRoleSelect = (r) => { setRole(r); setStep(1); };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (role === 'worker') { setStep(2); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    setStep(3);
  };

  const handleWorkerNext = (e) => {
    e.preventDefault();
    setError('');
    if (!workerForm.vehicleType) { setError('Please select an editing service type'); return; }
    if (!workerForm.licenseNo) { setError('License/ID number is required'); return; }
    setStep(3);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (otp !== '123456') { setError('Invalid OTP. Use 123456 for demo'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const data = {
      name: form.name, email: form.email,
      phone: form.phone, password: form.password,
      role,
      ...(role === 'worker' && {
        vehicle: `${workerForm.vehicleType} • ${workerForm.licenseNo}`,
        experience: workerForm.experience,
        address: workerForm.address,
        rating: 4.5,
        jobsDone: 0,
        available: false,
      }),
    };
    const result = register(data);
    setLoading(false);
    if (result.error) { setError(result.error); setStep(1); return; }
    navigate('/login');
  };

  const STEPS = role === 'worker' ? ['Role', 'Details', 'Editor Info', 'OTP'] : ['Role', 'Details', 'OTP'];
  const currentStep = step;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-brand"><img src={logo} alt="Lovito" className="auth-logo-img" /> Lovito</Link>

        {/* Step indicator */}
        {step > 0 && (
          <div className="reg-steps">
            {STEPS.map((s, i) => (
              <div key={s} className={`reg-step ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`}>
                <div className="rs-dot">{i < currentStep ? '✓' : i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>
        )}

        {/* Step 0: Role Selection */}
        {step === 0 && (
          <>
            <h1>Join Lovito</h1>
            <p className="auth-sub">How would you like to use Lovito?</p>
            <div className="role-cards">
              <button className="role-card" onClick={() => handleRoleSelect('customer')}>
                <div className="rc-icon customer">LV</div>
                <strong>I'm a Customer</strong>
                <span>Book editors and manage creative projects</span>
              </button>
              <button className="role-card" onClick={() => handleRoleSelect('worker')}>
                <div className="rc-icon worker">ED</div>
                <strong>I'm an Editor</strong>
                <span>Accept projects, upload work, and earn</span>
              </button>
            </div>
            <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
          </>
        )}

        {/* Step 1: Basic Details */}
        {step === 1 && (
          <>
            <h1>{role === 'worker' ? 'Editor Registration' : 'Create Account'}</h1>
            <p className="auth-sub">Enter your basic details</p>
            <form onSubmit={handleFormSubmit}>
              <label>Full Name
                <div className="input-wrap"><HiUser className="input-icon" /><input placeholder="Arjun Sharma" {...f('name')} required /></div>
              </label>
              <label>Email
                <div className="input-wrap"><HiMail className="input-icon" /><input type="email" placeholder="you@example.com" {...f('email')} required /></div>
              </label>
              <label>Phone
                <div className="input-wrap"><HiPhone className="input-icon" /><input type="tel" placeholder="+91 98765 43210" {...f('phone')} required /></div>
              </label>
              <label>Password
                <div className="input-wrap"><HiLockClosed className="input-icon" /><input type="password" placeholder="Min. 6 characters" {...f('password')} required /></div>
              </label>
              <label>Confirm Password
                <div className="input-wrap"><HiLockClosed className="input-icon" /><input type="password" placeholder="Repeat password" {...f('confirm')} required /></div>
              </label>
              {error && <div className="auth-error">⚠️ {error}</div>}
              <button type="submit" className="auth-submit" disabled={loading}>
                <span>{role === 'worker' ? 'Next: Editor Details' : 'Send OTP'}</span>
                <HiArrowRight style={{ width: 16, height: 16 }} />
              </button>
              <button type="button" className="auth-back" onClick={() => { setStep(0); setError(''); }}>← Back</button>
            </form>
          </>
        )}

        {/* Step 2: Editor Details */}
        {step === 2 && (
          <>
            <h1>Editor Details</h1>
            <p className="auth-sub">Tell us about your editing skills and portfolio</p>
            <form onSubmit={handleWorkerNext}>
              <label>Editing Service Type
                <div className="input-wrap">
                  <HiBriefcase className="input-icon" />
                  <select className="auth-select" value={workerForm.vehicleType} onChange={e => setWorkerForm(p => ({ ...p, vehicleType: e.target.value }))} required>
                    <option value="">Select type...</option>
                    {VEHICLE_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </label>
              <label>Portfolio / Profile ID
                <div className="input-wrap"><HiIdentification className="input-icon" /><input placeholder="Portfolio link or editor ID" {...w('licenseNo')} required /></div>
              </label>
              <label>Years of Experience
                <div className="input-wrap">
                  <HiBriefcase className="input-icon" />
                  <select className="auth-select" value={workerForm.experience} onChange={e => setWorkerForm(p => ({ ...p, experience: e.target.value }))} required>
                    <option value="">Select experience...</option>
                    {EXPERIENCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </label>
              <label>ID Number
                <div className="input-wrap"><HiIdentification className="input-icon" /><input placeholder="Verification ID" {...w('aadhar')} /></div>
              </label>
              <label>Current City
                <div className="input-wrap">
                  <MdEngineering className="input-icon" />
                  <input placeholder="City, State" {...w('address')} />
                </div>
              </label>
              {error && <div className="auth-error">⚠️ {error}</div>}
              <button type="submit" className="auth-submit">
                <span>Send OTP</span> <HiArrowRight style={{ width: 16, height: 16 }} />
              </button>
              <button type="button" className="auth-back" onClick={() => { setStep(1); setError(''); }}>← Back</button>
            </form>
          </>
        )}

        {/* Step 3: OTP */}
        {step === 3 && (
          <>
            <h1>Verify Mobile</h1>
            <p className="auth-sub">OTP sent to {form.phone}</p>
            <form onSubmit={handleVerifyOtp}>
              <div className="otp-info">
                <HiPhone className="otp-info-icon" />
                <div>
                  <strong>OTP sent to {form.phone}</strong>
                  <p>Enter the 6-digit code to verify</p>
                </div>
              </div>
              <label>Enter OTP
                <div className="input-wrap">
                  <HiLockClosed className="input-icon" />
                  <input
                    type="text" placeholder="123456" value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6} required autoFocus
                  />
                </div>
              </label>
              <div className="otp-hint">💡 Demo OTP: <strong>123456</strong></div>
              {error && <div className="auth-error">⚠️ {error}</div>}
              <button type="submit" className="auth-submit" disabled={loading || otp.length !== 6}>
                {loading ? 'Creating account...' : <><span>Verify & Create Account</span> <HiArrowRight style={{ width: 16, height: 16 }} /></>}
              </button>
              <button type="button" className="auth-back" onClick={() => { setStep(role === 'worker' ? 2 : 1); setOtp(''); setError(''); }}>← Back</button>
            </form>
          </>
        )}
      </div>

      <div className="auth-visual">
        <div className="av-content">
          {role === 'worker' ? (
            <>
              <div className="av-icon">ED</div>
              <h2>Earn with Lovito</h2>
              <p>Join verified editors accepting premium creative projects.</p>
              <div className="av-features">
                <div>Accept projects from one panel</div>
                <div>Upload review and final files</div>
                <div>Track earnings and payouts</div>
                <div>Grow portfolio ratings</div>
              </div>
            </>
          ) : (
            <>
              <div className="av-icon">LV</div>
              <h2>Book trusted editors on Lovito</h2>
              <p>Upload files, track projects, request revisions, and download final edits.</p>
              <div className="av-features">
                <div>Verified editor portfolios</div>
                <div>Real-time project chat</div>
                <div>Transparent pricing</div>
                <div>Revision management</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
