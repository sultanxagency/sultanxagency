import Reveal from '../components/Reveal.jsx'
import './Process.css'

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    text: 'We learn your business, audience and goals before recommending a single tactic.',
  },
  {
    number: '02',
    title: 'Strategize',
    text: 'We shape a clear growth plan across platforms, advertising and design.',
  },
  {
    number: '03',
    title: 'Create',
    text: 'Our team produces the content, campaigns and design assets your strategy needs.',
  },
  {
    number: '04',
    title: 'Launch',
    text: 'We roll out the work with care, making sure everything is set up to perform.',
  },
  {
    number: '05',
    title: 'Optimize',
    text: 'We track results and refine continuously so growth compounds over time.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section section-alt process">
      <div className="container">
        <div className="section-head-row">
          <div>
            <Reveal className="eyebrow">How we work</Reveal>
            <Reveal as="h2" className="section-heading">
              A clear process, start to finish.
            </Reveal>
          </div>
        </div>

        <ol className="process-list">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 90} className="process-step">
              <span className="process-number">{step.number}</span>
              <div className="process-copy">
                <h3 className="process-title">{step.title}</h3>
                <p className="process-text">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
