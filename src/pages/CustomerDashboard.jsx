import { Link, useNavigate } from 'react-router-dom';
import {
  HiChatAlt2, HiCloudUpload, HiDownload, HiFolderOpen, HiRefresh,
  HiSparkles, HiStatusOnline,
} from 'react-icons/hi';
import { useStore } from '../store/useStore';
import './CustomerDashboard.css';

const ACTIONS = [
  { Icon: HiCloudUpload, title: 'Upload files', text: 'Add raw footage, audio, briefs, brand kits, and references.' },
  { Icon: HiStatusOnline, title: 'Track projects', text: 'Follow every milestone from brief to final delivery.' },
  { Icon: HiRefresh, title: 'Request revisions', text: 'Send clear change notes and keep version history visible.' },
  { Icon: HiDownload, title: 'Download final files', text: 'Collect exports, masters, source files, and invoices.' },
];

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const projects = useStore(s => s.orders);

  return (
    <div className="customer-dashboard">
      <section className="customer-hero">
        <div>
          <span><HiSparkles /> Customer Dashboard</span>
          <h1>Manage your editing projects from upload to final download.</h1>
          <p>Static workspace preview for file uploads, project tracking, revision requests, chat, and final delivery.</p>
        </div>
        <button onClick={() => navigate('/browse')}>Find Editors</button>
      </section>

      <section className="customer-actions">
        {ACTIONS.map(({ Icon, title, text }) => (
          <article key={title}>
            <Icon />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="customer-shortcuts">
        <Link to="/customer/progress">
          <HiStatusOnline />
          <strong>Order Progress</strong>
          <span>Review milestones, editor updates, and next actions.</span>
        </Link>
        <Link to="/customer/chat">
          <HiChatAlt2 />
          <strong>Project Chat</strong>
          <span>Message your editor with protected communication rules.</span>
        </Link>
      </section>

      <section className="customer-grid">
        <div className="customer-panel">
          <div className="panel-head">
            <h2>Active Projects</h2>
            <span>{projects.length} running</span>
          </div>
          <div className="project-list">
            {projects.slice(0, 3).map(project => {
              const progress = Math.round((project.stage / (project.stages.length - 1)) * 100);
              const next = project.stages[Math.min(project.stage + 1, project.stages.length - 1)];
              return (
              <div className="project-row" key={project.id}>
                <div className="project-icon"><HiFolderOpen /></div>
                <div>
                  <strong>{project.vehicle?.name}</strong>
                  <p>{project.operator?.name || 'Assigning editor'} · {project.status}</p>
                  <div className="project-milestone">
                    <span>{project.stages[project.stage]}</span>
                    <small>Next: {next}</small>
                  </div>
                  <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
                  <div className="progress-label">{progress}% complete from editor</div>
                </div>
              </div>
            );})}
          </div>
        </div>

        <div className="customer-panel notifications-panel">
          <div className="panel-head">
            <h2>Notifications</h2>
            <HiChatAlt2 />
          </div>
          <div className="notice">Maya uploaded version 02 for your launch reel pack.</div>
          <div className="notice">Admin sent a payment confirmation for Podcast episode 18.</div>
          <div className="notice">Nora marked final wedding teaser files ready to download.</div>
        </div>
      </section>
    </div>
  );
}
