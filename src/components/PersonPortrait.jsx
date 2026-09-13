import { useCallback, useEffect, useRef, useState } from 'react'
import useInView from '../hooks/useInView.js'
import useScrollProgress from '../hooks/useScrollProgress.js'
import { gsap } from '../lib/gsap.js'
import { prefersReducedMotion } from '../utils/motionPreference.js'
import BrandMark from './BrandMark.jsx'
import './PersonPortrait.css'

/**
 * @param {object} props
 * @param {string} props.name
 * @param {Array<{src: string, angle: 'front'|'left'|'right'}>} props.images
 * @param {string} props.assetHint  Path shown on the placeholder so the owner
 *                                  knows exactly where to drop the real file.
 * @param {'left'|'right'} props.align  Which side of a two-column layout this sits on.
 */
export default function PersonPortrait({ name, images = [], assetHint, align = 'left' }) {
  const [revealRef, inView] = useInView()
  const [sectionRef, progress] = useScrollProgress({ start: 'top bottom', end: 'bottom top' })
  const frameRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const hasPhoto = images.length > 0
  const multiAngle = images.length >= 2

  // Stable ref callback — merges the IntersectionObserver ref (useInView)
  // with the tilt/parallax ref (frameRef). Memoized so its identity doesn't
  // change on every tilt-state re-render, which would otherwise cause
  // useInView to tear down and rebuild its observer on every mousemove.
  const setFrameNode = useCallback(
    (node) => {
      frameRef.current = node
      revealRef.current = node
    },
    [revealRef]
  )

  // Desktop pointer tilt — subtle, premium, disabled on touch/reduced-motion.
  useEffect(() => {
    const node = frameRef.current
    if (!node) return
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canHover || prefersReducedMotion()) return

    const handleMove = (e) => {
      const rect = node.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({ rx: py * -8, ry: px * 10 })
    }
    const reset = () => setTilt({ rx: 0, ry: 0 })

    node.addEventListener('mousemove', handleMove)
    node.addEventListener('mouseleave', reset)
    return () => {
      node.removeEventListener('mousemove', handleMove)
      node.removeEventListener('mouseleave', reset)
    }
  }, [])

  // Scroll-driven depth (subtle translate/scale of the whole frame).
  useEffect(() => {
    const node = frameRef.current
    if (!node || prefersReducedMotion()) return
    gsap.to(node, {
      y: (progress - 0.5) * -36,
      scale: 1 + progress * 0.03,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [progress])

  // Multi-angle blend: front(0) → left(0.33) → right(0.66) → front(1)
  const stops = multiAngle
    ? images.length === 3
      ? [0, 0.5, 1].map((t, i) => ({ t, img: images[i] }))
      : images.map((img, i) => ({ t: i / (images.length - 1), img }))
    : []

  return (
    <div ref={sectionRef} className={`portrait-wrap portrait-${align}`}>
      <div
        ref={setFrameNode}
        className={`portrait-frame ${inView ? 'portrait-in-view' : ''} ${
          hasPhoto ? 'portrait-has-photo' : 'portrait-placeholder'
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        {hasPhoto ? (
          multiAngle ? (
            stops.map(({ t, img }) => {
              const dist = Math.abs(progress - t)
              const opacity = Math.max(0, 1 - dist * 3.2)
              return (
                <img
                  key={img.src}
                  src={img.src}
                  alt={`${name} — ${img.angle} view`}
                  className="portrait-layer"
                  style={{ opacity }}
                />
              )
            })
          ) : (
            <img src={images[0].src} alt={name} className="portrait-layer" style={{ opacity: 1 }} />
          )
        ) : (
          <div className="portrait-empty" aria-hidden="true">
            <BrandMark size={40} className="portrait-empty-mark" />
            <p className="portrait-empty-label">Photo pending</p>
            <p className="portrait-empty-path">{assetHint}</p>
          </div>
        )}
        <div className="portrait-frame-border" aria-hidden="true" />
      </div>
    </div>
  )
}
