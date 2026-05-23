import { useState } from 'react';
import { HiChatAlt2, HiPaperAirplane, HiShieldCheck } from 'react-icons/hi';
import './CustomerDashboard.css';

const blockedPattern = /(\+?\d[\d\s().-]{7,}\d)|(\b(?:rs|inr|rupees|price|pricing|cost|rate|budget|quote|₹|\$)\b)/i;

export default function CustomerChat() {
  const [message, setMessage] = useState('');
  const [chatError, setChatError] = useState('');
  const [messages, setMessages] = useState([
    { from: 'editor', name: 'Maya Stone', text: 'Version 02 is uploaded for the launch reel. Please check the first hook and caption placement.' },
    { from: 'customer', name: 'You', text: 'The pace is strong. I will share two timestamp notes for the product close-ups.' },
    { from: 'editor', name: 'Maya Stone', text: 'Great. Keep the feedback in this thread and I will roll it into the next revision.' },
  ]);

  const sendMessage = () => {
    const clean = message.trim();
    if (!clean) return;
    if (blockedPattern.test(clean)) {
      setChatError('Phone numbers and pricing must stay inside approved Lovito booking and payment fields.');
      return;
    }
    setMessages(items => [...items, { from: 'customer', name: 'You', text: clean }]);
    setMessage('');
    setChatError('');
  };

  return (
    <div className="customer-dashboard chat-screen">
      <section className="customer-page-head">
        <span><HiChatAlt2 /> Project Chat</span>
        <h1>Chat with your assigned editor.</h1>
        <p>Share creative notes, references, timestamps, and revision feedback while Lovito keeps contact and pricing rules protected.</p>
      </section>

      <section className="customer-panel chat-panel standalone">
        <div className="policy-banner">
          <HiShieldCheck />
          <span>Mobile numbers and price negotiation are blocked in chat.</span>
        </div>
        <div className="chat-thread large">
          {messages.map((item, index) => (
            <div className={`chat-bubble ${item.from}`} key={`${item.from}-${index}`}>
              <strong>{item.name}</strong>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
        {chatError && <div className="chat-error">{chatError}</div>}
        <div className="chat-compose">
          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
            placeholder="Write revision notes, references, or approval feedback"
          />
          <button onClick={sendMessage} aria-label="Send message"><HiPaperAirplane /></button>
        </div>
      </section>
    </div>
  );
}
