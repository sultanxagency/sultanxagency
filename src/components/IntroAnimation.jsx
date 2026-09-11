import { useEffect, useState } from 'react'
import BrandMark from './BrandMark.jsx'
import './IntroAnimation.css'

const STAGE_DURATIONS = {
  welcome: 900,
  name: 1300,
  mark: 700,
  exit: 500,
}

export default function IntroAnimation({ onComplete }) {
  const [stage, setStage] = useState('welcome')
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      onComplete()
      return
    }

    const timers = []
    timers.push(setTimeout(() => setStage('name'), STAGE_DURATIONS.welcome))
    timers.push(
      setTimeout(() => setStage('mark'), STAGE_DURATIONS.welcome + STAGE_DURATIONS.name)
    )
    timers.push(
      setTimeout(
        () => setStage('exit'),
        STAGE_DURATIONS.welcome + STAGE_DURATIONS.name + STAGE_DURATIONS.mark
      )
    )
    timers.push(
      setTimeout(
        () => onComplete(),
        STAGE_DURATIONS.welcome +
          STAGE_DURATIONS.name +
          STAGE_DURATIONS.mark +
          STAGE_DURATIONS.exit
      )
    )

    return () => timers.forEach(clearTimeout)
  }, [onComplete, reducedMotion])

  if (reducedMotion) return null

  return (
    <div
      className={`intro ${stage === 'exit' ? 'intro-exit' : ''}`}
      role="presentation"
      aria-hidden="true"
      onClick={onComplete}
    >
      <div className="intro-inner">
        <p className={`intro-welcome ${stage !== 'welcome' ? 'intro-welcome-out' : ''}`}>
          WELCOME TO
        </p>
        <h1
          className={`intro-title ${
            stage === 'name' || stage === 'mark' || stage === 'exit' ? 'intro-title-in' : ''
          }`}
        >
          SULTAN X AGENCY
        </h1>
        <div className={`intro-mark ${stage === 'mark' || stage === 'exit' ? 'intro-mark-in' : ''}`}>
          <BrandMark size={56} animated />
        </div>
      </div>
      <span className="intro-skip">tap to skip</span>
    </div>
  )
}
