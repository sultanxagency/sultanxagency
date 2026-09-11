import { useCallback, useEffect, useState } from 'react'
import IntroAnimation from './components/IntroAnimation.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
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

  const completeIntro = useCallback(() => setIntroDone(true), [])

  return (
    <>
      {!introDone && <IntroAnimation onComplete={completeIntro} />}

      <Navbar />

      <main>
        <Hero />
        <About />
        <Services />
        <WhySultanX />
        <Process />
        <CTA />
      </main>

      <Footer />
    </>
  )
}
