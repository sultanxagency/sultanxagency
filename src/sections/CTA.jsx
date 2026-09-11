import { MessageCircle } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { getWhatsAppLink, CONTACT_EMAIL } from '../config.js'
import './CTA.css'

export default function CTA() {
  const whatsappLink = getWhatsAppLink()

  return (
    <section id="contact" className="section cta">
      <div className="container cta-inner">
        <Reveal className="eyebrow">Let's talk</Reveal>
        <Reveal as="h2" className="cta-title">
          Ready to grow?
        </Reveal>
        <Reveal delay={80} className="cta-text">
          Let's build a stronger digital presence for your business.
        </Reveal>

        <Reveal delay={160} className="btn-row cta-actions">
          <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-primary">
            Start Your Growth
          </a>
          <a
            href={whatsappLink || `mailto:${CONTACT_EMAIL}`}
            target={whatsappLink ? '_blank' : undefined}
            rel={whatsappLink ? 'noreferrer' : undefined}
            className="btn btn-ghost"
          >
            <MessageCircle size={17} />
            Contact Sultan X
          </a>
        </Reveal>
      </div>
    </section>
  )
}
