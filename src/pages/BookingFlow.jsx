import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allVehicles } from '../data/vehicles';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';
import {
  HiArrowLeft, HiArrowRight, HiLocationMarker, HiCalendar,
  HiClock, HiDocumentText, HiCheckCircle, HiShieldCheck,
  HiLocationMarker as HiLoc, HiCurrencyRupee, HiSparkles, HiShoppingCart,
  HiCloudUpload, HiStar,
} from 'react-icons/hi';
import { MdOutlineVerified, MdGpsFixed } from 'react-icons/md';
import './BookingFlow.css';

const FALLBACK = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80';

export default function BookingFlow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const placeOrder = useStore(s => s.placeOrder);
  const addToCart = useStore(s => s.addToCart);
  const user = useAuthStore(s => s.user);

  const vehicle = allVehicles.find(v => v.id === id);
  const [form, setForm] = useState({ location: '', date: '', duration: 1, notes: '' });
  const [step, setStep] = useState(1);
  const [priority, setPriority] = useState('standard');

  if (!vehicle) return <div className="not-found">Editor service not found.</div>;

  const rushFee = Math.round(vehicle.rate * 0.35);
  const priorityFee = priority === 'rush' ? rushFee : 0;
  const total = vehicle.rate * form.duration + priorityFee;

  const handleBook = () => {
    const customer = user
      ? { id: user.id, name: user.name, phone: user.phone }
      : { name: 'Guest', phone: '' };
    const order = placeOrder(vehicle, { ...form, priority, total }, customer);
    navigate(`/track/${order.id}`);
  };

  const handleAddToCart = () => {
    addToCart(vehicle, { ...form, priority, total });
    navigate('/cart');
  };

  const FEATURES = [
    { Icon: MdOutlineVerified, text: 'Verified Editor' },
    { Icon: HiShieldCheck,     text: 'Secure Files'  },
    { Icon: MdGpsFixed,        text: 'Project Tracking'    },
    { Icon: HiDocumentText,    text: 'Revision Notes'  },
  ];

  return (
    <div className="booking-flow">
      <section className="booking-hero">
        <img src={vehicle.image || FALLBACK} alt="" />
        <div className="booking-hero-shade" />
        <div className="booking-hero-content">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <HiArrowLeft style={{ width: 16, height: 16 }} /> Back
          </button>
          <span><HiSparkles /> Book Editor</span>
          <h1>{vehicle.name}</h1>
          <p>{vehicle.desc}</p>
          <div className="booking-hero-meta">
            <strong><HiStar /> 4.9 rated</strong>
            <strong><HiClock /> Fast delivery</strong>
            <strong><HiShieldCheck /> Secure workflow</strong>
          </div>
        </div>
      </section>

      <div className="booking-layout">
        {/* ── Left: Form ── */}
        <div className="booking-form-wrap">
          <div className="booking-steps">
            <span className={step >= 1 ? 'done' : ''}>
              <span className="step-circle">1</span> Project Details
            </span>
            <span className="sep-line" />
            <span className={step >= 2 ? 'done' : ''}>
              <span className="step-circle">2</span> Confirm & Pay
            </span>
          </div>

          {step === 1 && (
            <div className="form-section">
              <div className="form-title">
                <span>Step 1</span>
                <h2>Project Brief</h2>
                <p>Give the editor enough context to price, plan, and deliver the first version cleanly.</p>
              </div>

              <label>
                <span className="lbl-text">
                  <HiLocationMarker className="lbl-icon" /> Project Brief
                </span>
                <input
                  placeholder="Editing style, references, export needs"
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                />
              </label>

              <div className="brief-grid">
                {['Brand kit', 'Raw footage', 'Reference links', 'Captions'].map(item => (
                  <div key={item}><HiCloudUpload /> {item}</div>
                ))}
              </div>

              <label>
                <span className="lbl-text">
                  <HiCalendar className="lbl-icon" /> Date
                </span>
                <input
                  type="date"
                  value={form.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                />
              </label>

              <label>
                <span className="lbl-text">
                  <HiClock className="lbl-icon" /> Quantity
                </span>
                <div className="duration-ctrl">
                  <button onClick={() => setForm(f => ({ ...f, duration: Math.max(1, f.duration - 1) }))}>−</button>
                  <span>{form.duration}</span>
                  <button onClick={() => setForm(f => ({ ...f, duration: f.duration + 1 }))}>+</button>
                </div>
              </label>

              <label>
                <span className="lbl-text">
                  <HiDocumentText className="lbl-icon" /> Special Instructions
                </span>
                <textarea
                  placeholder="Revision instructions, file links, brand notes..."
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={3}
                />
              </label>

              <div className="delivery-options">
                <button type="button" className={priority === 'standard' ? 'active' : ''} onClick={() => setPriority('standard')}>
                  <strong>Standard</strong>
                  <span>No extra fee</span>
                </button>
                <button type="button" className={priority === 'rush' ? 'active' : ''} onClick={() => setPriority('rush')}>
                  <strong>Rush</strong>
                  <span>+₹{rushFee.toLocaleString()}</span>
                </button>
              </div>

              <button
                className="btn-primary"
                disabled={!form.location || !form.date}
                onClick={() => setStep(2)}
              >
                Continue <HiArrowRight style={{ width: 16, height: 16 }} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <div className="form-title">
                <span>Step 2</span>
                <h2>Confirm Booking</h2>
                <p>Review your brief, selected delivery speed, and booking total.</p>
              </div>
              <div className="confirm-details">
                <div className="cd-row">
                  <span><HiLoc className="cd-icon" /> Brief</span>
                  <strong>{form.location}</strong>
                </div>
                <div className="cd-row">
                  <span><HiCalendar className="cd-icon" /> Date</span>
                  <strong>{form.date}</strong>
                </div>
                <div className="cd-row">
                  <span><HiClock className="cd-icon" /> Quantity</span>
                  <strong>{form.duration}</strong>
                </div>
                <div className="cd-row">
                  <span><HiSparkles className="cd-icon" /> Delivery</span>
                  <strong>{priority === 'rush' ? 'Rush delivery' : 'Standard delivery'}</strong>
                </div>
                {form.notes && (
                  <div className="cd-row">
                    <span><HiDocumentText className="cd-icon" /> Notes</span>
                    <strong>{form.notes}</strong>
                  </div>
                )}
              </div>

              <div className="payment-info">
                <h3><HiCurrencyRupee style={{ width: 16, height: 16, verticalAlign: 'middle' }} /> Payment Summary</h3>
                <div className="pay-row"><span>Rate</span><span>₹{vehicle.rate.toLocaleString()} / {vehicle.unit}</span></div>
                <div className="pay-row"><span>Quantity</span><span>× {form.duration}</span></div>
                <div className="pay-row"><span>Priority</span><span>{priorityFee ? `₹${priorityFee.toLocaleString()}` : 'Included'}</span></div>
                <div className="pay-row total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
              </div>

              <div className="confirm-actions">
                <button className="btn-outline" onClick={() => setStep(1)}>
                  <HiArrowLeft style={{ width: 15, height: 15 }} /> Edit
                </button>
                <button className="btn-outline" onClick={handleAddToCart}>
                  <HiShoppingCart style={{ width: 15, height: 15 }} /> Add to Cart
                </button>
                <button className="btn-primary" onClick={handleBook}>
                  <HiCheckCircle style={{ width: 17, height: 17 }} /> Confirm & Book
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Service Summary ── */}
        <div className="vehicle-summary">
          <div className="vs-img-wrap">
            <img
              src={vehicle.image || FALLBACK}
              alt={vehicle.name}
              className="vs-img"
              onError={e => { e.target.src = FALLBACK; }}
            />
          </div>
          <div className="vs-body">
            <h3>{vehicle.name}</h3>
            <p>{vehicle.desc}</p>
            <div className="vs-rate">
              ₹{vehicle.rate.toLocaleString()} <span>/ {vehicle.unit}</span>
            </div>
            <div className="summary-progress">
              <div><span>Match quality</span><strong>96%</strong></div>
              <div><span>Typical turnaround</span><strong>2-5 days</strong></div>
            </div>
            <div className="vs-features">
              {FEATURES.map(({ Icon, text }) => (
                <div key={text} className="vs-feat">
                  <Icon className="vs-feat-icon" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
