import { Link } from 'react-router-dom';
import { HiArrowRight, HiCalendar, HiCheckCircle, HiClock, HiFolderOpen, HiStatusOnline } from 'react-icons/hi';
import { useStore } from '../store/useStore';
import './CustomerDashboard.css';

export default function CustomerProgress() {
  const orders = useStore(s => s.orders);

  return (
    <div className="customer-dashboard">
      <section className="customer-page-head">
        <span><HiStatusOnline /> Order Progress</span>
        <h1>Track every edit from brief to delivery.</h1>
        <p>Each booking shows the assigned editor, current milestone, timeline progress, and next action.</p>
      </section>

      <section className="progress-page-list">
        {orders.map(order => {
          const percent = Math.round((order.stage / (order.stages.length - 1)) * 100);
          const nextStage = order.stages[Math.min(order.stage + 1, order.stages.length - 1)];
          return (
            <article className="progress-order-card" key={order.id}>
              <div className="progress-order-top">
                <img src={order.vehicle?.image} alt={order.vehicle?.name} />
                <div>
                  <span className={`status-chip ${order.status}`}>{order.status}</span>
                  <h2>{order.vehicle?.name}</h2>
                  <p>{order.booking?.location}</p>
                </div>
              </div>

              <div className="progress-track big"><span style={{ width: `${percent}%` }} /></div>
              <div className="progress-card-meta">
                <span><HiCheckCircle /> {order.stages[order.stage]}</span>
                <span><HiClock /> Next: {nextStage}</span>
                <span><HiCalendar /> {order.booking?.date}</span>
              </div>

              <div className="mini-timeline">
                {order.stages.map((stage, index) => (
                  <div key={stage} className={index <= order.stage ? 'done' : ''}>
                    <i />
                    <span>{stage}</span>
                  </div>
                ))}
              </div>

              <div className="progress-order-footer">
                <div>
                  <HiFolderOpen />
                  <strong>{order.operator?.name || 'Assigning editor'}</strong>
                </div>
                <Link to={`/track/${order.id}`}>Open tracking <HiArrowRight /></Link>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
