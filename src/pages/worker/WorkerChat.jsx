import { useState } from 'react';
import { HiChatAlt2, HiPaperAirplane, HiShieldCheck, HiUserCircle } from 'react-icons/hi';
import './Worker.css';

const blockedPattern = /(\+?\d[\d\s().-]{7,}\d)|(\b(?:rs|inr|rupees|price|pricing|cost|rate|budget|quote|₹|\$)\b)/i;

export default function WorkerChat() {
  const [active, setActive] = useState('launch');
  const [message, setMessage] = useState('');
  const [chatError, setChatError] = useState('');
  const [threads, setThreads] = useState({
    launch: [
      { from: 'customer', name: 'Rhea', text: 'Please make the product reveal happen earlier in the first 5 seconds.' },
      { from: 'editor', name: 'You', text: 'Done. I will upload the updated hook pass today.' },
    ],
    podcast: [
      { from: 'customer', name: 'Rhea', text: 'Can you reduce echo in the guest mic?' },
      { from: 'editor', name: 'You', text: 'Yes, I am cleaning that track before the first review file.' },
    ],
  });

  const projects = [
    { id: 'launch', name: 'Product launch reel', customer: 'Rhea Kapoor' },
    { id: 'podcast', name: 'Podcast episode 18', customer: 'Rhea Kapoor' },
  ];

  const sendMessage = () => {
    const clean = message.trim();
    if (!clean) return;
    if (blockedPattern.test(clean)) {
      setChatError('Phone numbers and pricing must stay inside Lovito booking and payment tools.');
      return;
    }
    setThreads(items => ({
      ...items,
      [active]: [...items[active], { from: 'editor', name: 'You', text: clean }],
    }));
    setMessage('');
    setChatError('');
  };

  return (
    <div className="worker-page wide editor-chat-screen">
      <div className="wp-title">
        <HiChatAlt2 className="wp-title-icon" />
        <h1>Client Chat</h1>
      </div>

      <div className="worker-chat-layout">
        <aside className="thread-list">
          {projects.map(project => (
            <button key={project.id} className={active === project.id ? 'active' : ''} onClick={() => setActive(project.id)}>
              <HiUserCircle />
              <span>
                <strong>{project.name}</strong>
                <small>{project.customer}</small>
              </span>
            </button>
          ))}
        </aside>

        <section className="worker-section worker-chat-panel">
          <div className="policy-banner editor">
            <HiShieldCheck />
            <span>Keep contact details and pricing out of chat.</span>
          </div>
          <div className="worker-chat-thread">
            {threads[active].map((item, index) => (
              <div className={`worker-chat-bubble ${item.from}`} key={`${item.from}-${index}`}>
                <strong>{item.name}</strong>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          {chatError && <div className="worker-chat-error">{chatError}</div>}
          <div className="worker-chat-compose">
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
              placeholder="Send update, revision question, or file note"
            />
            <button onClick={sendMessage} aria-label="Send message"><HiPaperAirplane /></button>
          </div>
        </section>
      </div>
    </div>
  );
}
