import { Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react'
import BrandMark from './BrandMark.jsx'
import { SOCIAL_LINKS, getWhatsAppLink } from '../config.js'
import './Footer.css'

export default function Footer() {
  const whatsappLink = getWhatsAppLink()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-row">
            <BrandMark size={34} />
            <span className="footer-brand-name">SULTAN X AGENCY</span>
          </div>
          <p className="footer-tagline">Digital Growth &bull; Advertising &bull; Design</p>
        </div>

        <ul className="footer-social">
          <li>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={18} />
              <span>Instagram</span>
            </a>
          </li>
          <li>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Facebook size={18} />
              <span>Facebook</span>
            </a>
          </li>
          <li>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
              <Youtube size={18} />
              <span>YouTube</span>
            </a>
          </li>
          <li>
            <a
              href={whatsappLink || '#contact'}
              target={whatsappLink ? '_blank' : undefined}
              rel={whatsappLink ? 'noreferrer' : undefined}
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {year} SULTAN X AGENCY. All rights reserved.</p>
      </div>
    </footer>
  )
}
