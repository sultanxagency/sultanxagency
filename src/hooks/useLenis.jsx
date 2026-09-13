import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap.js'
import { prefersReducedMotion } from '../utils/motionPreference.js'

const LenisContext = createContext(null)

/**
 * Mounts a single Lenis instance for the whole app and wires it to GSAP's
 * ticker so ScrollTrigger and Lenis always agree on scroll position.
 *
 * Wrap <App> children in this once, near the root. Everything else — the
 * `useInView`/`Reveal` system, native anchor links, ScrollTrigger instances
 * created elsewhere — keeps working unchanged; this only replaces *how*
 * the page scrolls, not what happens when it does.
 */
export function LenisProvider({ children }) {
  const lenisRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      // Respect the OS/browser preference: leave native scrolling untouched.
      setReady(true)
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.1,
      // Let touch devices scroll natively — smoothing touch scroll tends to
      // feel laggy/unnatural on phones, and the brief calls for a deliberate
      // (not just squeezed-down) mobile experience.
      syncTouch: false,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerFn = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    setReady(true)

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -76, duration: 1.2 })
    }
    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(tickerFn)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = (target, options) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -76, duration: 1.2, ...options })
    } else {
      const node = typeof target === 'string' ? document.querySelector(target) : target
      node?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <LenisContext.Provider value={{ lenis: lenisRef, scrollTo, ready }}>
      {children}
    </LenisContext.Provider>
  )
}

export function useLenis() {
  const ctx = useContext(LenisContext)
  if (!ctx) {
    // Safe fallback for any component rendered outside the provider (tests,
    // Storybook, etc.) — degrade to native smooth scroll instead of throwing.
    return {
      lenis: { current: null },
      ready: true,
      scrollTo: (target) => {
        const node = typeof target === 'string' ? document.querySelector(target) : target
        node?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      },
    }
  }
  return ctx
}
