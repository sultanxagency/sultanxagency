import { ArrowDown } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import './Hero.css'

export default function Hero() {
  const scrollTo = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="container hero-inner">
        <Reveal className="hero-kicker">SULTAN X AGENCY</Reveal>

        <Reveal as="h1" delay={80} className="hero-title">
          Digital growth.
          <br />
          Built different.
        </Reveal>

        <Reveal delay={160} className="hero-lede">
          Sultan X Agency helps businesses, creators and entrepreneurs establish and grow their
          digital presence through strategic marketing, advertising and design.
        </Reveal>

        <Reveal delay={240} className="btn-row hero-actions">
          <a href="#contact" className="btn btn-primary" onClick={(e) => scrollTo(e, '#contact')}>
            Start Your Growth
          </a>
          <a href="#services" className="btn btn-ghost" onClick={(e) => scrollTo(e, '#services')}>
            Explore Services
          </a>
        </Reveal>
      </div>

      <a href="#about" className="hero-scroll" onClick={(e) => scrollTo(e, '#about')} aria-label="Scroll to About section">
        <ArrowDown size={18} />
      </a>
    </section>
  )
}
