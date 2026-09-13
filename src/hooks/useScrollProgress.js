import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '../lib/gsap.js'
import { prefersReducedMotion } from '../utils/motionPreference.js'

/**
 * Tracks scroll progress (0 → 1) of `ref`'s element against the viewport.
 *
 * @param {object} options
 * @param {string} options.start  ScrollTrigger start position (default: element enters bottom)
 * @param {string} options.end    ScrollTrigger end position (default: element leaves top)
 * @param {boolean} options.scrub Whether progress updates continuously (true) — always true here,
 *                                kept as an option in case a future caller wants a boolean trigger instead.
 */
export default function useScrollProgress({ start = 'top bottom', end = 'bottom top' } = {}) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (prefersReducedMotion()) {
      setProgress(1)
      return
    }

    const trigger = ScrollTrigger.create({
      trigger: node,
      start,
      end,
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    })

    return () => trigger.kill()
  }, [start, end])

  return [ref, progress]
}
