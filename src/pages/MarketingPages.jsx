import { useNavigate, useParams } from 'react-router-dom';
import {
  HiArrowRight, HiBadgeCheck, HiChatAlt2, HiCheckCircle, HiCloudUpload,
  HiClock, HiCurrencyRupee, HiLightningBolt, HiMail, HiPhone, HiPlay,
  HiQuestionMarkCircle, HiShieldCheck, HiSparkles, HiStar, HiUsers,
} from 'react-icons/hi';
import { categories } from '../data/vehicles';
import { editors, findEditorById } from '../data/editors';
import Footer from '../components/Footer';
import './MarketingPages.css';

const FEATURES = [
  { Icon: HiCloudUpload, title: 'Brief and file upload', text: 'Share raw footage, references, captions, brand kits, and delivery goals.' },
  { Icon: HiChatAlt2, title: 'Editor collaboration', text: 'Keep project notes, approvals, and revisions tied to the booking.' },
  { Icon: HiPlay, title: 'Milestone tracking', text: 'Follow brief, first cut, revision, final export, and delivery stages.' },
  { Icon: HiShieldCheck, title: 'Protected workflow', text: 'Centralized communication and booking details for customers and editors.' },
];

const PLANS = [
  { name: 'Starter', price: '₹2,999', text: 'Short edits and creator-ready delivery.', perks: ['1 active project', '2 revision rounds', 'Standard editor match'] },
  { name: 'Studio', price: '₹8,999', text: 'Recurring videos and campaign work.', perks: ['5 active projects', 'Priority editors', 'Source files included'], featured: true },
  { name: 'Agency', price: 'Custom', text: 'Managed post-production at scale.', perks: ['Dedicated manager', 'Bulk reports', 'Custom SLA workflow'] },
];

export function Services() {
  const navigate = useNavigate();
  return (
    <PageShell eyebrow="Services" title="Editing services for creators, brands, events, and production teams.">
      <div className="service-category-grid">
        {categories.map(category => (
          <article className="marketing-card" key={category.id}>
            <span className="card-kicker">{category.label}</span>
            <h2>{category.vehicles.length} service options</h2>
            <div className="service-list">
              {category.vehicles.map(service => (
                <button key={service.id} onClick={() => navigate(`/book/${service.id}`)}>
                  <span>{service.name}</span>
                  <strong>₹{service.rate.toLocaleString()}</strong>
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
      <section className="marketing-band">
        {FEATURES.map(({ Icon, title, text }) => (
          <article key={title}>
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}

export function Pricing() {
  const navigate = useNavigate();
  return (
    <PageShell eyebrow="Pricing" title="Clear packages for one-off edits and recurring content production.">
      <div className="pricing-page-grid">
        {PLANS.map(plan => (
          <article className={`marketing-card price-page-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>
            <h2>{plan.name}</h2>
            <strong>{plan.price}</strong>
            <p>{plan.text}</p>
            {plan.perks.map(perk => <span key={perk}><HiCheckCircle /> {perk}</span>)}
            <button onClick={() => navigate('/browse')}>Choose editors <HiArrowRight /></button>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

export function Portfolio() {
  const navigate = useNavigate();
  return (
    <PageShell eyebrow="Portfolio" title="Browse editor profiles, specialties, sample work, and booking details.">
      <div className="portfolio-grid">
        {editors.map(editor => (
          <article className="portfolio-card" key={editor.id}>
            <img src={editor.image} alt={editor.name} />
            <div>
              <span className="availability">{editor.availability}</span>
              <h2>{editor.name}</h2>
              <p>{editor.specialty}</p>
              <div className="profile-stats">
                <span><HiStar /> {editor.rating}</span>
                <span><HiUsers /> {editor.projects} projects</span>
                <span><HiCurrencyRupee /> {editor.rate.toLocaleString()}</span>
              </div>
              <button onClick={() => navigate(`/editors/${editor.id}`)}>More details <HiArrowRight /></button>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

export function EditorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = findEditorById(id);

  if (!editor) {
    return (
      <PageShell eyebrow="Editor not found" title="This editor profile is not available.">
        <button className="page-primary" onClick={() => navigate('/portfolio')}>Back to portfolio</button>
      </PageShell>
    );
  }

  return (
    <div className="editor-detail-page">
      <section className="editor-detail-hero">
        <img src={editor.cover} alt="" />
        <div className="editor-detail-shade" />
        <div className="editor-detail-content">
          <img className="editor-detail-avatar" src={editor.image} alt={editor.name} />
          <span>{editor.role}</span>
          <h1>{editor.name}</h1>
          <p>{editor.bio}</p>
          <div className="profile-stats">
            <strong><HiStar /> {editor.rating} rating</strong>
            <strong><HiClock /> {editor.turnaround}</strong>
            <strong><HiCurrencyRupee /> {editor.rate.toLocaleString()} starting</strong>
          </div>
          <div className="hero-actions">
            <button onClick={() => navigate('/book/video-editor')}>Book editor <HiArrowRight /></button>
            <button className="secondary" onClick={() => navigate('/contact')}>Contact team</button>
          </div>
        </div>
      </section>
      <section className="editor-detail-grid">
        <article className="marketing-card">
          <span className="card-kicker">Strengths</span>
          {editor.strengths.map(item => <p className="detail-pill" key={item}><HiBadgeCheck /> {item}</p>)}
        </article>
        <article className="marketing-card">
          <span className="card-kicker">Tools</span>
          {editor.tools.map(item => <p className="detail-pill" key={item}><HiSparkles /> {item}</p>)}
        </article>
        <article className="marketing-card wide">
          <span className="card-kicker">Portfolio highlights</span>
          <div className="highlight-list">
            {editor.portfolio.map(item => <div key={item}>{item}</div>)}
          </div>
        </article>
      </section>
      <Footer />
    </div>
  );
}

export function Contact() {
  return (
    <PageShell eyebrow="Contact" title="Talk to Lovito about your next editing project.">
      <div className="contact-layout">
        <article className="marketing-card contact-card">
          <HiMail />
          <h2>Email</h2>
          <p>hello@lovito.com</p>
        </article>
        <article className="marketing-card contact-card">
          <HiPhone />
          <h2>Phone</h2>
          <p>+91 90000 12000</p>
        </article>
        <form className="marketing-card contact-form">
          <input placeholder="Your name" />
          <input placeholder="Email address" />
          <select defaultValue="">
            <option value="" disabled>Project type</option>
            <option>Social video</option>
            <option>Brand film</option>
            <option>Wedding or event</option>
            <option>Post production</option>
          </select>
          <textarea rows={5} placeholder="Tell us about your project" />
          <button type="button">Send message <HiArrowRight /></button>
        </form>
      </div>
    </PageShell>
  );
}

export function Support() {
  return (
    <PageShell eyebrow="Support" title="Get help with bookings, uploads, revisions, payments, and editor communication.">
      <section className="support-grid">
        {[
          ['Booking help', 'Find the right editor, adjust project details, and understand delivery timelines.'],
          ['File and upload issues', 'Guidance for raw footage, references, review files, and final exports.'],
          ['Payments and invoices', 'Check payment status, project totals, and invoice records.'],
          ['Safety rules', 'Keep pricing and phone numbers inside approved Lovito workflows.'],
        ].map(([title, text]) => (
          <article className="marketing-card support-card" key={title}>
            <HiQuestionMarkCircle />
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="support-steps">
        <div><HiLightningBolt /><strong>Average first response</strong><span>Under 4 business hours</span></div>
        <div><HiChatAlt2 /><strong>Live project support</strong><span>Use dashboard chat for editor coordination</span></div>
        <div><HiShieldCheck /><strong>Policy checks</strong><span>Contact and price sharing are automatically flagged</span></div>
      </section>
    </PageShell>
  );
}

function PageShell({ eyebrow, title, children }) {
  return (
    <div className="marketing-page">
      <section className="marketing-hero">
        <span><HiSparkles /> {eyebrow}</span>
        <h1>{title}</h1>
      </section>
      <main className="marketing-content">{children}</main>
      <Footer />
    </div>
  );
}
