import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal.jsx'
import './ServiceCard.css'

export default function ServiceCard({ service, isOpen, onToggle, delay }) {
  const { icon: Icon, name, description, detail } = service

  return (
    <Reveal as="li" delay={delay} className="service-card-wrap">
      <div className={`service-card ${isOpen ? 'service-card-open' : ''}`}>
        <button
          type="button"
          className="service-card-trigger"
          aria-expanded={isOpen}
          onClick={onToggle}
        >
          <span className="service-card-icon">
            <Icon size={22} strokeWidth={1.6} />
          </span>
          <span className="service-card-copy">
            <span className="service-card-name">{name}</span>
            <span className="service-card-desc">{description}</span>
          </span>
          <span className="service-card-arrow">
            <ArrowUpRight size={18} />
          </span>
        </button>

        <div className="service-card-detail" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
          <div className="service-card-detail-inner">
            <p>{detail}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
