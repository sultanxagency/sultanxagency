
// ---------------------------------------------------------------------------
// SULTAN X AGENCY — leadership profiles
//
// `images` is ordered front → left → right (however many you have — 1 is
// fine, 3 enables the interpolated multi-angle portrait described in the
// brief). Drop files into the paths below, then list them here.
//
// Example once photos exist:
//   images: [
//     { src: '/assets/ceo/mohammed-ibrahim-front.webp', angle: 'front' },
//     { src: '/assets/ceo/mohammed-ibrahim-left.webp', angle: 'left' },
//     { src: '/assets/ceo/mohammed-ibrahim-right.webp', angle: 'right' },
//   ]
// ---------------------------------------------------------------------------
import { BRAND } from '../config.js'

export const CEO_PROFILE = {
  role: 'Chief Executive Officer',
  name: BRAND.ceo,
  bio: "Mohammed Ibrahim leads Sultan X Agency's client strategy and growth direction — shaping how every engagement moves from plan to measurable result.",
  images: [],
  assetHint: '/public/assets/ceo/',
}

export const FOUNDER_PROFILE = {
  role: 'Founder',
  name: BRAND.founder,
  bio: 'Bunty established Sultan X Agency to bring premium, results-driven digital work to ambitious brands, creators and entrepreneurs.',
  images: [],
  assetHint: '/public/assets/founder/',
}
