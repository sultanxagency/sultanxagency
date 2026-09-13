import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import BrandMark from './BrandMark.jsx'
import { useLenis } from '../hooks/useLenis.jsx'
import './Navbar.css'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollTo } = useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavigate = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    scrollTo(href)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#home" className="navbar-brand" onClick={(e) => handleNavigate(e, '#home')}>
          <BrandMark size={30} />
          <span className="navbar-brand-text">SULTAN X</span>
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavigate(e, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="btn btn-primary navbar-cta"
          onClick={(e) => handleNavigate(e, '#contact')}
        >
          Start Your Growth
        </a>

        <button
          className="navbar-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <nav className="mobile-menu-links" aria-label="Mobile">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{ transitionDelay: `${i * 45}ms` }}
              onClick={(e) => handleNavigate(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="btn btn-primary"
          onClick={(e) => handleNavigate(e, '#contact')}
        >
          Start Your Growth
        </a>
      </div>
    </header>
  )
}
