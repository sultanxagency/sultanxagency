// ---------------------------------------------------------------------------
// SULTAN X AGENCY — animation engine bootstrap
//
// Single place where GSAP + its plugins are imported and registered.
// Every other file should import gsap/ScrollTrigger from here (not from
// 'gsap' directly) so registration only ever happens once.
// ---------------------------------------------------------------------------
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)

  // Sensible, premium-feeling defaults. Individual tweens can still override.
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.9,
  })
}

export { gsap, ScrollTrigger }
