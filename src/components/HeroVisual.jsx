import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'
import useScrollProgress from '../hooks/useScrollProgress.js'
import { prefersReducedMotion, isLowPowerViewport } from '../utils/motionPreference.js'
import './HeroVisual.css'

/**
 * The hero's "physical" scroll-reactive object, per the brief's section 6/7:
 *
 *   0%  — centred, still, dark
 *   20% — slow rotation begins
 *   40% — moves into depth (scales down, pushes back)
 *   60–100% — recedes and fades as the next section takes over
 *
 * Built entirely from the existing brand geometry (concentric rings + the
 * X mark) scaled up — no invented logo, photo, or 3D asset. If a real GLB
 * model or image sequence is supplied later, this component is the drop-in
 * replacement point: same scroll-progress contract, different visual.
 */
export default function HeroVisual() {
  const [sectionRef, progress] = useScrollProgress({ start: 'top top', end: 'bottom top' })
  const groupRef = useRef(null)

  useEffect(() => {
    const node = groupRef.current
    if (!node || prefersReducedMotion()) return

    const damp = isLowPowerViewport() ? 0.55 : 1

    // progress: 0 → 1 across the hero's own scroll span
    const rotate = progress * 130 * damp
    const scale = 1 - progress * 0.34 * damp
    const depthY = progress * -70 * damp
    const opacity = 1 - Math.min(progress / 0.85, 1)

    gsap.to(node, {
      rotate,
      scale,
      y: depthY,
      opacity,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [progress])

  return (
    <div ref={sectionRef} className="hero-visual" aria-hidden="true">
      <div ref={groupRef} className="hero-visual-group">
        <svg viewBox="0 0 480 480" className="hero-visual-svg">
          <circle cx="240" cy="240" r="228" className="hv-ring hv-ring-outer" />
          <circle cx="240" cy="240" r="176" className="hv-ring hv-ring-mid" />
          <circle cx="240" cy="240" r="128" className="hv-ring hv-ring-inner" />
          <path d="M170 170 L310 310 M310 170 L170 310" className="hv-x" />
        </svg>
      </div>
    </div>
  )
}
