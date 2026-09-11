import { useState } from 'react'
import { Youtube, Instagram, Facebook, Target, Search, Smartphone, LayoutTemplate } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import './Services.css'

const SERVICES = [
  {
    icon: Youtube,
    name: 'YouTube Growth',
    description: 'Channel strategy and audience growth.',
    detail:
      'We help creators and businesses grow their presence on YouTube through content strategy, channel optimization and audience-building tactics designed for sustainable, long-term growth.',
  },
  {
    icon: Instagram,
    name: 'Instagram Growth',
    description: 'Presence, content and engagement.',
    detail:
      'From content direction to community growth, we help brands and creators build a stronger, more engaged presence on Instagram that turns followers into a real audience.',
  },
  {
    icon: Facebook,
    name: 'Facebook Growth',
    description: 'Page growth and audience building.',
    detail:
      'We support businesses and creators in expanding their reach on Facebook with page growth strategy, content planning and community engagement that builds lasting visibility.',
  },
  {
    icon: Target,
    name: 'Meta Ads',
    description: 'Advertising across Instagram & Facebook.',
    detail:
      'Strategic Meta advertising management built to generate awareness, leads and sales — with campaigns planned, tested and optimized around real business outcomes.',
  },
  {
    icon: Search,
    name: 'Google Ads',
    description: 'Search and performance advertising.',
    detail:
      'We plan and manage Google Ads campaigns designed to capture demand at the right moment, driving qualified traffic, leads and sales for your business.',
  },
  {
    icon: Smartphone,
    name: 'App Design',
    description: 'Modern, conversion-focused app UI.',
    detail:
      'We design modern, intuitive app experiences that are easy to use and built to convert — combining clean interface design with a clear focus on user experience.',
  },
  {
    icon: LayoutTemplate,
    name: 'Website Design',
    description: 'Responsive, premium web experiences.',
    detail:
      'We create modern, responsive websites that represent your brand at a premium level while being structured to convert visitors into customers.',
  },
]

export default function Services() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="services" className="section section-alt services">
      <div className="container">
        <div className="section-head-row">
          <div>
            <Reveal className="eyebrow">What we do</Reveal>
            <Reveal as="h2" className="section-heading">
              Our services
            </Reveal>
          </div>
          <Reveal delay={80} className="section-lede services-lede">
            A focused set of growth, advertising and design services — each one built around
            measurable outcomes for your business.
          </Reveal>
        </div>

        <ul className="services-grid">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.name}
              service={service}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
              delay={(i % 3) * 90}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
