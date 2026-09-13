import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'
import { prefersReducedMotion } from '../utils/motionPreference.js'

/**
 * Subtle magnetic-pull hover effect for buttons/links, per the brief's
 * "premium, not cartoonish" micro-interaction guidance.
 *
 * Desktop + fine-pointer only: touch devices get the CSS :active press
 * feedback already defined on .btn instead (see index.css), which is the
 * more honest equivalent on a screen with no hover state.
 *
 * @param {number} strength  Max pixel displacement toward the cursor. Default 10.
 */
export default function useMagnetic(strength = 10) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canHover || prefersReducedMotion()) return

    const xTo = gsap.quickTo(node, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(node, 'y', { duration: 0.45, ease: 'power3.out' })

    const handleMove = (e) => {
      const rect = node.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      xTo((relX / rect.width) * strength * 2)
      yTo((relY / rect.height) * strength * 2)
    }

    const handleLeave = () => {
      xTo(0)
      yTo(0)
    }

    node.addEventListener('mousemove', handleMove)
    node.addEventListener('mouseleave', handleLeave)

    return () => {
      node.removeEventListener('mousemove', handleMove)
      node.removeEventListener('mouseleave', handleLeave)
      gsap.set(node, { x: 0, y: 0 })
    }
  }, [strength])

  return ref
}
