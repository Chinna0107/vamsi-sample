import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { categories, allVehicles } from '../data/vehicles';
import { editors } from '../data/editors';
import { useStore } from '../store/useStore';
import { HiSearch, HiFilter, HiStar, HiClock, HiCheckCircle, HiShoppingCart, HiX, HiLocationMarker, HiCalendar } from 'react-icons/hi';
import { GiCrane } from 'react-icons/gi';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaTractor, FaRoad } from 'react-icons/fa';
import { MdConstruction, MdEngineering } from 'react-icons/md';
import './Browse.css';

const CAT_ICONS = {
  excavation:   GiCrane,
  transport:    TbTruckDelivery,
  road:         FaRoad,
  lifting:      GiCrane,
  agricultural: FaTractor,
  other:        MdEngineering,
};

const FALLBACK = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80';

export default function Browse() {
  const [params] = useSearchParams();
  const [activeCat, setActiveCat] = useState(params.get('cat') || 'all');
  const [search, setSearch] = useState('');
  const [cartModal, setCartModal] = useState(null); // vehicle being added
  const [form, setForm] = useState({ location: '', date: '', duration: 1 });
  const [added, setAdded] = useState(null); // cartId of last added
  const navigate = useNavigate();
  const addToCart = useStore(s => s.addToCart);

  const openCartModal = (e, vehicle) => {
    e.stopPropagation();
    setForm({ location: '', date: '', duration: 1 });
    setCartModal(vehicle);
  };

  const handleAddToCart = () => {
    addToCart(cartModal, { ...form, total: cartModal.rate * form.duration });
    setAdded(cartModal.id);
    setCartModal(null);
    setTimeout(() => setAdded(null), 2000);
  };

  const filtered = allVehicles.filter(v => {
    const matchCat = activeCat === 'all' || v.category === activeCat;
    const matchSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="browse">
      {/* Header */}
      <div className="browse-header">
        <div>
          <h1>Find Editors</h1>
          <p>{filtered.length} editor services available</p>
        </div>
        <div className="search-wrap">
          <HiSearch className="search-icon" />
          <input
            className="search-input"
            placeholder="Search video, brand, podcast..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="cat-tabs">
        <button className={activeCat === 'all' ? 'active' : ''} onClick={() => setActiveCat('all')}>
          <MdConstruction className="tab-icon" /> All Editors
        </button>
        {categories.map(c => {
          const Icon = CAT_ICONS[c.id] || MdConstruction;
          return (
            <button
              key={c.id}
              className={activeCat === c.id ? 'active' : ''}
              onClick={() => setActiveCat(c.id)}
            >
              <Icon className="tab-icon" /> {c.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <section className="editor-profile-strip">
        <div className="profile-strip-head">
          <div>
            <h2>Featured editor profiles</h2>
            <p>Open a profile to see specialties, tools, portfolio highlights, and booking details.</p>
          </div>
          <button onClick={() => navigate('/portfolio')}>View all profiles</button>
        </div>
        <div className="profile-strip-grid">
          {editors.map(editor => (
            <article className="profile-mini-card" key={editor.id}>
              <img src={editor.image} alt={editor.name} />
              <div>
                <h3>{editor.name}</h3>
                <p>{editor.specialty}</p>
                <span><HiStar /> {editor.rating} · {editor.projects} projects</span>
                <button onClick={() => navigate(`/editors/${editor.id}`)}>More details</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="vehicles-grid">
        {filtered.map(v => (
          <div key={v.id} className="vehicle-card" onClick={() => navigate(`/book/${v.id}`)}>
            <div className="vc-img-wrap">
              <img
                src={v.image || FALLBACK}
                alt={v.name}
                className="vc-img"
                onError={e => { e.target.src = FALLBACK; }}
              />
              <span className="vc-avail">
                <HiCheckCircle style={{ width: 11, height: 11 }} /> Available
              </span>
            </div>
            <div className="vc-body">
              <h3>{v.name}</h3>
              <p>{v.desc}</p>
              <div className="vc-meta">
                <span className="vc-meta-item">
                  <HiStar style={{ width: 13, height: 13, color: '#f59e0b' }} /> 4.8
                </span>
                <span className="vc-meta-item">
                  <HiClock style={{ width: 13, height: 13, color: '#888' }} /> 60 min arrival
                </span>
              </div>
              <div className="vc-footer">
                <div className="vc-rate">
                  <strong>₹{v.rate.toLocaleString()}</strong>
                  <span>/{v.unit}</span>
                </div>
                <div className="vc-actions">
                  <button className="vc-cart-btn" onClick={e => openCartModal(e, v)}>
                    <HiShoppingCart style={{ width: 15, height: 15 }} />
                  </button>
                  <button className="vc-book-btn" onClick={e => { e.stopPropagation(); navigate(`/book/${v.id}`); }}>Book Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <HiFilter style={{ width: 40, height: 40, color: '#ddd', marginBottom: 12 }} />
            <p>No editors found. Try a different search.</p>
          </div>
        )}
      </div>

      {/* Add to Cart Modal */}
      {cartModal && (
        <div className="modal-overlay" onClick={() => setCartModal(null)}>
          <div className="cart-modal" onClick={e => e.stopPropagation()}>
            <div className="cm-header">
              <h3>Add project to cart</h3>
              <button className="cm-close" onClick={() => setCartModal(null)}><HiX /></button>
            </div>
            <div className="cm-vehicle">
              <img src={cartModal.image} alt={cartModal.name} className="cm-img" />
              <div>
                <strong>{cartModal.name}</strong>
                <span>₹{cartModal.rate.toLocaleString()}/{cartModal.unit}</span>
              </div>
            </div>
            <label>
              <span><HiLocationMarker className="cm-lbl-icon" /> Project Notes</span>
              <input placeholder="Editing style, references, output format" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
            </label>
            <label>
              <span><HiCalendar className="cm-lbl-icon" /> Date</span>
              <input type="date" value={form.date} min={new Date().toISOString().split('T')[0]} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </label>
            <label>
              <span>Quantity</span>
              <div className="duration-ctrl">
                <button onClick={() => setForm(f => ({ ...f, duration: Math.max(1, f.duration - 1) }))}>−</button>
                <span>{form.duration}</span>
                <button onClick={() => setForm(f => ({ ...f, duration: f.duration + 1 }))}>+</button>
              </div>
            </label>
            <div className="cm-total">Total: <strong>₹{(cartModal.rate * form.duration).toLocaleString()}</strong></div>
            <button className="cm-add-btn" disabled={!form.location || !form.date} onClick={handleAddToCart}>
              <HiShoppingCart style={{ width: 16, height: 16 }} /> Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      {added && (
        <div className="cart-toast">
          <HiCheckCircle style={{ width: 18, height: 18 }} /> Added to cart!
          <button onClick={() => navigate('/cart')}>View Cart →</button>
        </div>
      )}
    </div>
  );
}
