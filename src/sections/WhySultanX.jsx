import { Compass, Sparkles, TrendingUp, Layers, Briefcase } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import './WhySultanX.css'

const POINTS = [
  {
    icon: Compass,
    title: 'Strategy-driven growth',
    text: 'Every engagement starts with a clear plan, not guesswork — built around your goals and your market.',
  },
  {
    icon: Sparkles,
    title: 'Premium creative execution',
    text: 'Design and content that look and feel like a serious, established brand, not a rushed project.',
  },
  {
    icon: TrendingUp,
    title: 'Performance-focused advertising',
    text: 'Campaigns are planned and optimized around real outcomes — leads, sales and measurable return.',
  },
  {
    icon: Layers,
    title: 'Modern digital presence',
    text: 'Websites, apps and profiles that are current, responsive and built to represent your brand well.',
  },
  {
    icon: Briefcase,
    title: 'Business-focused approach',
    text: 'We treat every project as a business outcome first — growth that supports where you are headed.',
  },
]

export default function WhySultanX() {
  return (
    <section className="section why">
      <div className="container">
        <div className="section-head-row">
          <div>
            <Reveal className="eyebrow">Why Sultan X</Reveal>
            <Reveal as="h2" className="section-heading">
              A different kind of agency partner.
            </Reveal>
          </div>
        </div>

        <ul className="why-list">
          {POINTS.map((point, i) => (
            <Reveal as="li" key={point.title} delay={(i % 3) * 90} className="why-item">
              <point.icon size={22} strokeWidth={1.6} className="why-icon" />
              <div>
                <h3 className="why-title">{point.title}</h3>
                <p className="why-text">{point.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
