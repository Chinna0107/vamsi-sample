import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  HiArrowRight, HiBadgeCheck, HiChatAlt2, HiCheckCircle, HiCloudUpload,
  HiLockClosed, HiPlay,
  HiRefresh, HiShieldCheck, HiSparkles, HiStar, HiUsers,
} from 'react-icons/hi';
import './Home.css';

const BANNERS = [
  {
    eyebrow: 'Premium editor marketplace',
    title: 'Book elite editors for videos, reels, brands, and launches.',
    copy: 'Lovito connects customers with verified creative editors, secure file delivery, revision tracking, and polished final exports.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1400&q=85',
  },
  {
    eyebrow: 'Real projects. Real deadlines.',
    title: 'From raw files to final cuts without project chaos.',
    copy: 'Upload assets, chat with your editor, approve milestones, request revisions, and download final files from one workplace.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=85',
  },
  {
    eyebrow: 'Trusted creative operations',
    title: 'Hire editors with portfolios, ratings, and transparent pricing.',
    copy: 'Browse specialists for weddings, podcasts, product shoots, YouTube, social ads, and commercial post-production.',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=1400&q=85',
  },
];

const FEATURES = [
  { Icon: HiBadgeCheck, title: 'Portfolio profiles', text: 'Verified editor pages with niches, reels, turnaround time, and client ratings.' },
  { Icon: HiChatAlt2, title: 'Real-time chat', text: 'Keep creative notes, references, and approvals attached to the project.' },
  { Icon: HiCloudUpload, title: 'File upload', text: 'Share raw footage, brand kits, captions, references, and review versions.' },
  { Icon: HiPlay, title: 'Order tracking', text: 'Track briefs, rough cuts, revisions, final export, and delivery in one timeline.' },
  { Icon: HiStar, title: 'Ratings & reviews', text: 'Book with confidence using visible project history and satisfaction scores.' },
  { Icon: HiLockClosed, title: 'Secure payments', text: 'Static demo flow today, designed around protected milestone payments.' },
  { Icon: HiRefresh, title: 'Revision management', text: 'Collect change requests and keep version history clear for both sides.' },
  { Icon: HiShieldCheck, title: 'Admin controls', text: 'Manage customers, editors, booking reports, and targeted notifications.' },
];

const EDITORS = [
  { name: 'Maya Stone', skill: 'Brand films & social ads', rating: '4.9', price: '₹7,500', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80' },
  { name: 'Arjun Mehta', skill: 'YouTube & podcast edits', rating: '4.8', price: '₹4,800', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80' },
  { name: 'Nora Quinn', skill: 'Wedding cinematic cuts', rating: '5.0', price: '₹12,000', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80' },
  { name: 'Dev Rao', skill: 'Reels, shorts & motion', rating: '4.9', price: '₹2,900', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80' },
];

const PLANS = [
  { name: 'Starter', price: '₹2,999', text: 'For creators with short edits and simple delivery.', perks: ['1 active project', '2 revision rounds', 'Standard delivery'] },
  { name: 'Studio', price: '₹8,999', text: 'For teams shipping campaigns and recurring content.', perks: ['5 active projects', 'Priority editors', 'Source files included'], featured: true },
  { name: 'Agency', price: 'Custom', text: 'For brands needing managed post-production at scale.', perks: ['Dedicated manager', 'SLA workflows', 'Bulk booking reports'] },
];

const TESTIMONIALS = [
  { quote: 'We booked a product editor in minutes and had clean ad cuts the same week.', name: 'Rhea Kapoor', role: 'D2C Founder' },
  { quote: 'The revision timeline alone saved us hours. Everyone knew exactly what was pending.', name: 'Sam Wilson', role: 'YouTube Producer' },
  { quote: 'Lovito feels like a premium creative ops desk, not a random freelancer list.', name: 'Neel Shah', role: 'Marketing Lead' },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const banner = BANNERS[active];

  useEffect(() => {
    const timer = setInterval(() => setActive(i => (i + 1) % BANNERS.length), 5200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      <section className="hero-banner">
        <img className="hero-bg" src={banner.image} alt="" />
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="hero-eyebrow"><HiSparkles /> {banner.eyebrow}</span>
          <h1>{banner.title}</h1>
          <p>{banner.copy}</p>
          <div className="hero-actions">
            <button className="primary-action" onClick={() => navigate('/browse')}>
              Find Editors <HiArrowRight />
            </button>
            <button className="glass-action" onClick={() => navigate('/login')}>
              Sign in to dashboard
            </button>
          </div>
          <div className="hero-metrics">
            <span><strong>320+</strong> verified editors</span>
            <span><strong>4.9</strong> average rating</span>
            <span><strong>24h</strong> fast match</span>
          </div>
        </div>
        <div className="hero-dots">
          {BANNERS.map((item, i) => (
            <button key={item.title} className={i === active ? 'active' : ''} onClick={() => setActive(i)} aria-label={`Show banner ${i + 1}`} />
          ))}
        </div>
      </section>

      <section id="features" className="section">
        <div className="section-inner">
          <div className="section-heading">
            <span>Core Features</span>
            <h2>An editor workplace built for booking, review, and delivery.</h2>
          </div>
          <div className="feature-grid">
            {FEATURES.map(({ Icon, title, text }) => (
              <article className="feature-card" key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section split-section">
        <div className="section-inner split-grid">
          <div className="section-heading left">
            <span>How It Works</span>
            <h2>Brief, match, collaborate, approve.</h2>
            <p>Customers get a clear delivery flow while editors get one focused panel for accepting projects, uploading work, tracking earnings, and managing portfolios.</p>
          </div>
          <div className="steps-panel">
            {[
              ['01', 'Upload your brief', 'Add footage, references, deadlines, and project goals.'],
              ['02', 'Choose an editor', 'Compare portfolios, pricing, ratings, and availability.'],
              ['03', 'Track every milestone', 'Chat, review cuts, request revisions, and approve delivery.'],
              ['04', 'Download final files', 'Receive exports, source files, and invoices from the customer dashboard.'],
            ].map(([n, title, text]) => (
              <div className="step-row" key={n}>
                <strong>{n}</strong>
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section">
        <div className="section-inner">
          <div className="section-heading">
            <span>Top Editors Showcase</span>
            <h2>Specialists ready for polished creative work.</h2>
          </div>
          <div className="editor-grid">
            {EDITORS.map(editor => (
              <article className="editor-card" key={editor.name}>
                <img src={editor.image} alt={editor.name} />
                <div>
                  <h3>{editor.name}</h3>
                  <p>{editor.skill}</p>
                  <div className="editor-meta">
                    <span><HiStar /> {editor.rating}</span>
                    <strong>{editor.price}</strong>
                  </div>
                  <button onClick={() => navigate('/book/video-editor')}>Book editor</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="section">
        <div className="section-inner">
          <div className="section-heading">
            <span>Pricing Plans</span>
            <h2>Simple plans for every editing workload.</h2>
          </div>
          <div className="pricing-grid">
            {PLANS.map(plan => (
              <article className={`price-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>
                <h3>{plan.name}</h3>
                <strong>{plan.price}</strong>
                <p>{plan.text}</p>
                {plan.perks.map(perk => <span key={perk}><HiCheckCircle /> {perk}</span>)}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner testimonials">
          {TESTIMONIALS.map(item => (
            <article className="testimonial-card" key={item.name}>
              <div className="stars">★★★★★</div>
              <p>"{item.quote}"</p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="cta-footer">
        <div>
          <span><HiUsers /> Editors and customers, one workplace</span>
          <h2>Start your next edit with Lovito.</h2>
          <p>Use the static login accounts to explore customer, editor, and admin panels today.</p>
        </div>
        <button onClick={() => navigate('/login')}>Open Login <HiArrowRight /></button>
      </section>

      <Footer />
    </div>
  );
}
