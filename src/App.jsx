import { useCallback, useEffect, useState } from 'react'
import { LenisProvider } from './hooks/useLenis.jsx'
import { ScrollTrigger } from './lib/gsap.js'
import IntroAnimation from './components/IntroAnimation.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import CEOSection from './sections/CEOSection.jsx'
import FounderSection from './sections/FounderSection.jsx'
import Services from './sections/Services.jsx'
import WhySultanX from './sections/WhySultanX.jsx'
import Process from './sections/Process.jsx'
import CTA from './sections/CTA.jsx'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = introDone ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [introDone])

  useEffect(() => {
    if (!introDone) return
    // Layout settles once the intro unmounts and body scroll unlocks —
    // refresh so every ScrollTrigger measures correct start/end positions.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [introDone])

  const completeIntro = useCallback(() => setIntroDone(true), [])

  return (
    <LenisProvider>
      {!introDone && <IntroAnimation onComplete={completeIntro} />}

      <Navbar />

      <main>
        <Hero />
        <About />
        <CEOSection />
        <FounderSection />
        <Services />
        <WhySultanX />
        <Process />
        <CTA />
      </main>

      <Footer />
    </LenisProvider>
  )
}
