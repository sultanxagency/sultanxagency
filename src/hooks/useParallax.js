import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap.js'
import { prefersReducedMotion, isLowPowerViewport } from '../utils/motionPreference.js'

/**
 * Applies a scrub-linked parallax transform to `ref`'s element as its
 * container scrolls through the viewport. Disabled entirely under
 * prefers-reduced-motion, and dampened on small touch viewports so mobile
 * never just inherits the desktop depth values (per the brief's mobile rules).
 *
 * @param {object} options
 * @param {number} options.y        Vertical travel in px (desktop). Default 60.
 * @param {number} options.scale    Optional scale delta, e.g. 0.08 for 1 → 1.08.
 * @param {number} options.rotate   Optional rotation delta in degrees.
 * @param {HTMLElement|null} options.container  Scroll trigger container; defaults to the element itself.
 */
export default function useParallax({ y = 60, scale = 0, rotate = 0, container = null } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || prefersReducedMotion()) return

    const damp = isLowPowerViewport() ? 0.4 : 1
    const travel = y * damp
    const scaleDelta = scale * damp
    const rotateDelta = rotate * damp

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { y: -travel / 2, scale: 1 - scaleDelta / 2, rotate: -rotateDelta / 2 },
        {
          y: travel / 2,
          scale: 1 + scaleDelta / 2,
          rotate: rotateDelta / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: container || node,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, node)

    return () => ctx.revert()
  }, [y, scale, rotate, container])

  return ref
}
