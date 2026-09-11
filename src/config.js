// ---------------------------------------------------------------------------
// SULTAN X AGENCY — site configuration
// Edit the values below to update contact details and social links.
// ---------------------------------------------------------------------------

// Add your WhatsApp number in international format, digits only.
// Example: "919876543210" for an Indian number +91 98765 43210.
// Leave empty to hide the WhatsApp link/CTA fallback.
export const WHATSAPP_NUMBER = ''

export const WHATSAPP_MESSAGE = "Hi Sultan X Agency, I'd like to grow my digital presence."

export const getWhatsAppLink = () => {
  if (!WHATSAPP_NUMBER) return null
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
}

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/sultanxagency',
  facebook: 'https://facebook.com/sultanxagency',
  youtube: 'https://youtube.com/@sultanxagency',
}

export const CONTACT_EMAIL = 'hello@sultanxagency.com'

export const BRAND = {
  name: 'SULTAN X AGENCY',
  ceo: 'Mohammed Ibrahim',
  founder: 'Bunty',
}
