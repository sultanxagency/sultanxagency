// ---------------------------------------------------------------------------
// SULTAN X AGENCY — motion preference helper
// ---------------------------------------------------------------------------
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Also treats small-viewport / coarse-pointer (typical phones) as a signal
 * to dial back heavy scroll-jacking effects, per the brief's mobile rules.
 * This is a *complexity* budget, not an accessibility one — reduced motion
 * above is the accessibility check and always wins.
 */
export function isLowPowerViewport() {
  if (typeof window === 'undefined') return false
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const narrow = window.innerWidth < 820
  return coarsePointer && narrow
}
