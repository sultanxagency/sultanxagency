import Reveal from '../components/Reveal.jsx'
import { BRAND } from '../config.js'
import './About.css'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div className="about-copy">
          <Reveal className="eyebrow">About Sultan X</Reveal>
          <Reveal as="h2" className="section-heading">
            Built for digital growth.
          </Reveal>
          <Reveal delay={100} className="about-text">
            <p>
              Sultan X Agency was built on a simple idea: growth online should feel intentional,
              not accidental. We work closely with businesses, creators and entrepreneurs to shape
              a digital presence that actually reflects the quality of what they offer.
            </p>
            <p>
              From platform growth to advertising and design, every engagement is treated as a
              long-term partnership rather than a one-off project. We plan with strategy, execute
              with craft, and measure what matters.
            </p>
          </Reveal>
        </div>

        <div className="about-people">
          <Reveal delay={120} className="people-card">
            <span className="people-role">CEO</span>
            <h3 className="people-name">{BRAND.ceo}</h3>
            <p className="people-note">
              Leads the agency's client strategy and growth direction across every engagement.
            </p>
          </Reveal>
          <Reveal delay={220} className="people-card">
            <span className="people-role">Founder</span>
            <h3 className="people-name">{BRAND.founder}</h3>
            <p className="people-note">
              Established Sultan X Agency to bring premium, results-driven digital work to
              ambitious brands.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
