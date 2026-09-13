import Reveal from '../components/Reveal.jsx'
import PersonPortrait from '../components/PersonPortrait.jsx'
import { FOUNDER_PROFILE } from '../data/people.js'
import './Leadership.css'

export default function FounderSection() {
  const { name, role, bio, images, assetHint } = FOUNDER_PROFILE

  return (
    <section className="section section-alt leadership leadership-founder">
      <div className="container leadership-grid leadership-grid-reverse">
        <div className="leadership-copy-col">
          <Reveal className="eyebrow">Leadership</Reveal>
          <Reveal delay={80} className="leadership-role">
            {role}
          </Reveal>
          <Reveal as="h2" delay={140} className="leadership-name">
            {name}
          </Reveal>
          <Reveal delay={220} className="leadership-bio">
            {bio}
          </Reveal>
          <Reveal delay={300} className="btn-row">
            <a href="#contact" className="btn btn-ghost">
              Work with our team
            </a>
          </Reveal>
        </div>

        <div className="leadership-portrait-col">
          <PersonPortrait name={name} images={images} assetHint={assetHint} align="right" />
        </div>
      </div>
    </section>
  )
}
